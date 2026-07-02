import { Worker, Job } from "bullmq";
import { redis } from "@/constants/redis";
import { PrismaClient, Form } from "@/generated/prisma/client";

class SaveFormWorker {
  private prisma = new PrismaClient();
  private worker!: Worker;
  private handleWorker() {
    this.worker = new Worker(
      "save-form-queue",
      async (job: Job<ISaveForm>) => {
        const { data } = job;
        const form = await this.prisma.form.findUnique({
          where: {
            ownerId: data.userId,
            id: data.meta.id,
          },
        });
        let newForm;
        if (!form) {
          newForm = await this.prisma.form.create({
            data: {
              id: data.meta.id,
              name: data.meta.title,
              description: data.meta.description,
              ownerId: data.userId,
            },
          });
        }
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
