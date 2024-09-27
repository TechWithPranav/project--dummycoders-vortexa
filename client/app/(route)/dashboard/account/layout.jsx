import React from "react";
import UserAccountNavbar from "@/app/_components/cure/navigation/user-account-navbar";
import { currentUser } from "@clerk/nextjs/server";

const AccountLayout = async ({ children }) => {
    const user = await currentUser();

    return (
        <main className="mx-auto w-full z-40 relative px-2 md:px-4">
            <UserAccountNavbar />
            {children}
        </main>
    );
};

export default AccountLayout;
