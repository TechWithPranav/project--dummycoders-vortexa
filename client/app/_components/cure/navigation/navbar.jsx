import Link from "next/link";
import Icons from "../global/icons";
import MaxWidthWrapper from "../global/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import UserAccount from "../user-account";

const Navbar = ({ user }) => {
    return (
        <header className="sticky top-0 inset-x-0 w-full h-14 border-b border-border/40 bg-background/50 backdrop-blur-md z-50">
            <MaxWidthWrapper>
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex">
                        <Link href="/cure" className="flex items-center font-semibold gap-2 text-lg">
                            <Icons.logo className="w-8 h-8" />
                            Cura
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
                                    Dashboard
                                </Link>
                                <UserAccount />
                            </>
                        ) : (
                            <>
                                <Link href="/signin" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Login
                                </Link>
                                <Link href="/signup" className={buttonVariants({ size: "sm" })}>
                                    Start for free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    );
};

export default Navbar;
