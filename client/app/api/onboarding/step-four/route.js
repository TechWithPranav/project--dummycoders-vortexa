import { db } from "@/app/_lib";
import { StepFourSchema } from "@/app/_lib";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request) {
    const body = await request.json();

    const { happiness, mood, sleep, stress } = StepFourSchema.parse(body);

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!happiness || !mood || !sleep || !stress) {
        return new NextResponse("Invalid data passed", { status: 422 });
    }

    try {
        await db.mentalWellness.create({
            data: {
                userId: user.id,
                happiness,
                mood,
                sleep,
                stress,
            },
        });

        return NextResponse.json("Mentalwellness created!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", { status: 422 });
        }

        return new NextResponse("Could not create mentalwellness", { status: 500 });
    }
}
