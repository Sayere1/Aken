import {
    CircleXIcon, CircleCheckIcon,
    ClockArrowUpIcon, VideoIcon,
    LoaderIcon
} from "lucide-react";


import { MeetingStatus } from "../../types";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";
import { CommandSelect } from "@/components/command-select";

const options = [
    {
        id: MeetingStatus.Upcoming,
        value: MeetingStatus.Upcoming,
        children: (
            <div className="flex gap-x-2 capitalize items-center">
                <ClockArrowUpIcon />
                {MeetingStatus.Upcoming}
            </div>
        )
    },

    {
        id: MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children: (
            <div className="flex gap-x-2 capitalize items-center">
                <CircleCheckIcon />
                {MeetingStatus.Completed}
            </div>
        )
    },

    {
        id: MeetingStatus.Active,
        value: MeetingStatus.Active,
        children: (
            <div className="flex gap-x-2 capitalize items-center">
                <VideoIcon />
                {MeetingStatus.Active}
            </div>
        )
    },

    {
        id: MeetingStatus.Processing,
        value: MeetingStatus.Processing,
        children: (
            <div className="flex gap-x-2 capitalize items-center">
                <LoaderIcon />
                {MeetingStatus.Processing}
            </div>
        )
    },

    {
        id: MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children: (
            <div className="flex gap-x-2 capitalize items-center">
                <CircleXIcon />
                {MeetingStatus.Cancelled}
            </div>
        ),
    },
];

export const StatusFilter = () => {

    const [filters, setFilters] = useMeetingsFilter();

    return (
        <CommandSelect placeholder="Status" className="h-9" options={options}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            value={filters.status ?? ""} OnSearch={() => { }}
        />
    );

}