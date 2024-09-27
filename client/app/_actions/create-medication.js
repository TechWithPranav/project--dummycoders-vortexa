"use server";

import { db } from "../_lib";
import { currentUser } from "@clerk/nextjs/server";
import { Adherence, Frequency } from "@prisma/client";

const createMedication = async ({ name, dosage, adherence, frequency }) => {

    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to perform this action");
    }

    if (!name || !dosage || !adherence || !frequency) {
        throw new Error("Missing required fields");
    }

    try {
        await db.medication.create({
            data: {
                userId: user.id,
                name,
                dosage,
                adherence,
                frequency,
            },
        });
    } catch (error) {
        console.error("Error creating medication", error);
        throw new Error("Error creating medication");
    }
};

export default createMedication;
