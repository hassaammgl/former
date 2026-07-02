import { NextRequest, NextResponse } from "next/server";
import prisma from "@/services/prisma/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const job = await prisma.backgroundJob.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        result: true,
        error: true,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          message: "Job not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
