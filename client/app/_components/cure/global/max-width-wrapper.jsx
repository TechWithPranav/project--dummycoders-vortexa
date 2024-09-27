import { cn } from "../../_lib";
import React from "react";

const MaxWidthWrapper = ({ className, children }) => {
    return (
        <section className={cn(
            "h-full mx-auto w-full max-w-screen-xl px-4 md:px-12 lg:px-20",
            className,
        )}>
            {children}
        </section>
    )
};

export default MaxWidthWrapper;
