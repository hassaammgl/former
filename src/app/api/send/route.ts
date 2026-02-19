import { emailQueue } from "@/services/bullmq/queue";
import { NextResponse } from "next/server";

export async function POST() {
  await emailQueue.add("send-email", {
    to: "test@test.com",
    subject: "Hello",
  });

  return NextResponse.json({ status: "queued" });
}
