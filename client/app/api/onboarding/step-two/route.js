import { StepTwoSchema } from "@/app/_lib";
import { db } from "@/app/_lib";
import { currentUser } from "@clerk/nextjs/server";
import { Frequency, SymptomName } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request) {
    const body = await request.json();

    const { name, frequency, intensity } = StepTwoSchema.parse(body);

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !frequency || !intensity) {
        return new NextResponse("Invalid data passed", { status: 422 });
    }

    try {
        await db.symptom.create({
            data: {
                userId: user.id,
                name: name,
                frequency: frequency,
                intensity,
            },
        });

        return NextResponse.json("Symptom created!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", { status: 422 });
        }

        return new NextResponse("Could not create symptom", { status: 500 });
    }
}
