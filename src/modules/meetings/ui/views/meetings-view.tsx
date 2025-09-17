"use client"

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";


export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div className="flex flex-1 pb-4 flex-col px-4 gap-y-4 md:px-8">
          <DataTable data={data.items} columns={columns} />
          {data.items.length === 0 && (
                          <EmptyState title="create your first meeting"
                          description="Create a meeting to connect with others, each meeting let you 
                          collaborate, share ideas and interact with participant in real time" />
                      )}
        </div>
    )
}


export const MeetingsViewLoading = () => {
    return (
        <LoadingState title="Loading Meetings" description="This may take a few seconds..." />
    );
};


export const MeetingsViewError = () => {
    return (
        <ErrorState title="Error loading Meetings" description="Try again..." />
    )
};
