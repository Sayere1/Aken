"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filters";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";





export const MeetingsListHeader = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [filters, setFilters] = useMeetingsFilter();
    const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId;

    const onClearFilters = () => {
        setFilters({
            status: null,
            agentId: null,
            search: "",
            page: DEFAULT_PAGE,
        });
    };

    return (
        <>
            <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-4 px-4 md:px-8 flex-col flex gap-y-4">
                <div className="items-center justify-between flex ">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusIcon />
                        New Meetings
                    </Button>
                </div>
                <ScrollArea>
                    <div className="items-center p-1 flex gap-x-2">
                        <MeetingsSearchFilter />
                        <StatusFilter />
                        <AgentIdFilter />
                        {isAnyFilterModified && (
                            <Button variant="outline" onClick={onClearFilters}>
                                <XCircleIcon className="size-4" />
                                Clear
                            </Button>
                        )}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </>
    );
};