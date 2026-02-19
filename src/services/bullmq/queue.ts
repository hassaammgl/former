import { Queue } from "bullmq";
import { redis } from "@/constants/redis";

export const emailQueue = new Queue("email-queue", {
  connection: redis,
});
