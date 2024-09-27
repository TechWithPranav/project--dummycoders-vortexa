"use client";

import { getHealthTips } from "@/app/_actions";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

const HealthTips = ({ symptoms, medications, user }) => {
    const [tips, setTips] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useMutation({
        mutationKey: ["get-tips"],
        mutationFn: async () => {
            setIsLoading(true);
            const res = await getHealthTips({ symptoms, medications, user });
            localStorage.setItem("cura_health_tips", res);
            setTips(res);
            setIsLoading(false);
            return res;
        },
        onError: (error) => {
            setIsLoading(false);
            console.error(error);
            toast.error("Error getting health tips");
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Health tips generated!");
        },
    });

    const handleRefresh = () => {
        mutate();
    };

    useEffect(() => {
        const storedTips = localStorage.getItem("cura_health_tips");
        if (storedTips) {
            setTips(storedTips);
        } else {
            mutate();
        }
    }, [mutate]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <LoaderIcon className="w-6 h-6 animate-spin" />
                    <p className="text-sm text-muted-foreground font-medium mt-2">
                        Loading health tips...
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-start w-full h-full">
                    {tips ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-line">
                            {tips}
                        </ReactMarkdown>
                    ) : (
                        <p className="text-sm text-muted-foreground font-medium text-center w-full">
                            No health tips available.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HealthTips;
