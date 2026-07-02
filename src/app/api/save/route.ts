import { NextResponse, NextRequest } from "next/server";
import { saveFormQueue } from "@/services/bullmq/queue";

export async function POST(request: NextRequest) {
  const body = await request.json();
  await saveFormQueue.add("save-form-queue", body);
  return NextResponse.json({ status: "Saving form ..." });
}
