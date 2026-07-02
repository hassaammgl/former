import { Queue } from "bullmq";
import { redis } from "@/constants/redis";

export const emailQueue = new Queue("email-queue", {
  connection: redis,
});
export const saveFormQueue = new Queue("save-form-queue", {
  connection: redis,
});
