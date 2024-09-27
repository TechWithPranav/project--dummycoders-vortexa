"use server";

import { db } from "../_lib";
import { currentUser } from "@clerk/nextjs/server";
import getMessags from "./get-messages";

const createMessages = async ({ role, message }) => {

    const user = await currentUser();

    if (!user) {
        throw new Error("User not found");
    }

    try {
        await db.message.create({
            data: {
                role,
                content: message,
                userId: user.id
            },
        });

        await getMessags();

    } catch (error) {
        console.log("Error creating message: ", error);
    }
};

export default createMessages;
