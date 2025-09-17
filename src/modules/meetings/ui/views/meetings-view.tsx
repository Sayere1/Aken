"use client"

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";


export const MeetingsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [ filters, setFilters ] = useMeetingsFilter();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }))

    return (
        <div className="flex flex-1 pb-4 flex-col px-4 gap-y-4 md:px-8">
          <DataTable data={data.items} columns={columns} 
          onRowClick={(row) => router.push(`/meetings/${row.id}`)} />
          <DataPagination
          page={filters.page}
          totalPages={data.totalPages} 
          onPageChange={(page) => setFilters({page})}/>
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
