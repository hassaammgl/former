import { Worker } from "bullmq";

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log("Processing:", job.data);
    setTimeout(() => {}, 5000);
  },
  {
    connection: {
      port: Number(process.env.REDIS_PORT!),
      host: "127.0.0.1",
      maxRetriesPerRequest: null,
    },
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} done`);
});
