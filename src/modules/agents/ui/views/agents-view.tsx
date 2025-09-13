"use client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";



export const AgentView = () => {
    const [filters, setFilters] = useAgentsFilter();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="pb-4 flex-1 px-4 md:px-8 flex-col flex gap-y-4">
            <DataTable data={data.items} columns={columns} />
            <DataPagination page={filters.page} totalPages={data.totalPages}
            onPageChange={(page) => setFilters({page})}/>
            {data.items.length === 0 && (
                <EmptyState title="create your first agent"
                description="Create an Agent to join your meetings, 
                each agent will follow your instructions and can interact with particpants during the calls" />
            )}
        </div>
    )
};


export const AgentViewLoading = () => {
    return (
        <LoadingState title="Loading Agents" description="This may take a few seconds..." />
    );
};


export const AgentViewError = () => {
    return (
        <ErrorState title="Error loading Agents" description="Try again..." />
    )
};