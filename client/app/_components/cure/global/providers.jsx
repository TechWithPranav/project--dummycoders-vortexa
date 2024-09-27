"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const Providers = ({ children }) => {
    return (
        <ClerkProvider>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </ClerkProvider>
    );
};

export default Providers;
