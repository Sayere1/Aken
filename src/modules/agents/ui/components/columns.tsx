"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentsGetMany } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({row}) => (
        <div className="flex gap-y-1 flex-col">
            <div className="flex gap-x-2 items-center">
                <GeneratedAvatar variant="botttsNeutral"
                seed={row.original.name}
                className="size-6" />
                <span className="font-semibold capitalize">{row.original.name}</span>
            </div>
            <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-2">
                    <CornerDownRightIcon className="size-3 text-muted-foreground" />
                    <span className="text-muted-foreground max-w-[200px] truncate text-sm capitalize">
                        {row.original.instructions}
                        </span>
                </div>
            </div>
        </div>
    )
  },

  {
    accessorKey: "MeetingCount",
    header: "Meetings",
    cell: ({ row }) => (
        <Badge className="items-center gap-x-2 [&<svg]:size-4 flex" variant="outline">
            <VideoIcon className="text-blue-700" />
            {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
        </Badge>
    )
  }

]