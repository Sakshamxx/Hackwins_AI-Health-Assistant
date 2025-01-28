// File: app/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// File: app/api/workouts/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { type, duration, exercises } = body;

    const workout = await prisma.workout.create({
      data: {
        userId,
        type,
        duration,
        exercises: {
          create: exercises,
        },
        date: new Date(),
      },
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    console.error("[WORKOUTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
      include: {
        exercises: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    console.error("[WORKOUTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// File: app/api/measurements/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { weight, height, bodyFat } = body;

    const measurement = await prisma.measurement.create({
      data: {
        userId,
        weight,
        height,
        bodyFat,
      },
    });

    return NextResponse.json(measurement);
  } catch (error) {
    console.error("[MEASUREMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const measurements = await prisma.measurement.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(measurements);
  } catch (error) {
    console.error("[MEASUREMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
