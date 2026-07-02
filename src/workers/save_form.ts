import { Worker, Job } from "bullmq";
import { redis } from "@/constants/redis";
import prisma from "@/services/prisma/prisma";
import type { Prisma } from "@/generated/prisma/client";

class SaveFormWorker {
  private worker!: Worker;
  private handleWorker() {
    this.worker = new Worker(
      "save-form-queue",
      async (job: Job<ISaveForm>) => {
        const { data } = job;

        await prisma.$transaction(async (tx) => {
          // Check form
          let form = await tx.form.findUnique({
            where: {
              id: data.meta.id,
            },
          });

          if (!form) {
            form = await tx.form.create({
              data: {
                id: data.meta.id,
                ownerId: data.userId,
                name: data.meta.title,
                description: data.meta.description,
              },
            });
          } else {
            form = await tx.form.update({
              where: {
                id: form.id,
              },
              data: {
                name: data.meta.title,
                description: data.meta.description,
              },
            });
          }

          // Create new version
          const version = await tx.formVersion.create({
            data: {
              id: crypto.randomUUID(),
              formId: form.id,
              version: data.meta.version,
              schema: JSON.parse(JSON.stringify(data.fields)),
              isPublished: false,
            },
          });

          // Store fields
          await tx.formField.createMany({
            data: data.fields.map((field, index) => ({
              id: crypto.randomUUID(),
              formVersionId: version.id,
              type: field.type,
              label: field.label ?? "",
              name: field.id,
              required: field.required ?? false,
              order: index,
              config: JSON.parse(JSON.stringify(field)),
            })),
          });

          return form;
        });
      },
      {
        connection: redis,
      },
    );

    this.worker?.on("completed", (job) => {
      console.log(`Job ${job.id} done`);
    });
  }
  public start() {
    console.log("Save Form Worker started");
    this.handleWorker();
    console.log("Save Worker Ended");
  }
}

export const saveFormWorker = new SaveFormWorker();
