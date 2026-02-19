import { Worker } from "bullmq";
import { redis } from "@/constants/redis";

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log("Processing:", job.data);
    setTimeout(() => {}, 5000);
  },
  {
    connection: redis,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} done`);
});
