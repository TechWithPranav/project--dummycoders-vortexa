import { getMessags } from "@/app/_actions";
import ChatBox from "@/app/_components/cure/dashboard/chat-box";
import { db } from "@/app/_lib";
import { currentUser } from "@clerk/nextjs/server";

const AIPage = async () => {
    const messages = await getMessags();

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    const symptoms = await db.symptom.findMany({
        where: {
            userId: user?.id,
        },
    });

    const medications = await db.medication.findMany({
        where: {
            userId: user?.id,
        },
    });

    // const isPro = dbUser?.stripeCustomerId ? true : false;

    const isPro = true;

    return (
        <div className="flex flex-col items-start w-full h-[calc(100dvh-52px)] sm:h-[calc(100dvh-72px)] pt-2 md:py-4">
            <div className="flex flex-col items-center h-full w-full">
                <ChatBox
                    isPro={isPro}
                    user={dbUser}
                    symptoms={symptoms}
                    medications={medications}
                    messages={messages}
                />
            </div>
        </div>
    );
};

export default AIPage;
