import { Queue } from "bullmq";

export const emailQueue = new Queue("email-queue", {
  connection: {
    port: Number(process.env.REDIS_PORT!),
    host: "127.0.0.1",
    maxRetriesPerRequest: null,
  },
});
