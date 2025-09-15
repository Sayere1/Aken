"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const TranscribeView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.transcribe.getMany.queryOptions({}))

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}


export const TranscribeViewLoading = () => {
    return (
        <LoadingState title="Loading Transcriptions" description="This may take a few seconds..." />
    );
};


export const TranscribeViewError = () => {
    return (
        <ErrorState title="Error loading transcription" description="Try again..." />
    )
};


