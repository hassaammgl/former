import { Worker } from "bullmq";
import { redis } from "@/constants/redis";

class EmailWorker {
  private worker!: Worker;
  private handleWorker() {
    this.worker = new Worker(
      "email-queue",
      async (job) => {
        console.log("Processing:", job.data);
        setTimeout(() => {}, 5000);
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
    console.log("Email Worker started");
    this.handleWorker();
    console.log("Email Worker Ended");
  }
}

export const emailWorker = new EmailWorker();
