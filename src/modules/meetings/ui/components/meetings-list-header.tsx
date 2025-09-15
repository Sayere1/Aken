"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon,} from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";




export const MeetingsListHeader = () => {

    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

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
            <div className="items-center p-1 flex gap-x-2">
                todo filters
            </div>
        </div>
        </>
    );
};