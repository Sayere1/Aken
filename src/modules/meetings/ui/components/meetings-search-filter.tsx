import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useMeetingsFilter } from "../../hooks/use-meetings-filters";

export const MeetingsSearchFilter = () => {
    const [ filters, setFilters ] = useMeetingsFilter();

    return (
        <div className="relative">
            <Input className="h-9 bg-white w-[200px] pl-7" placeholder="filter by name"
            value={filters.search} onChange={(e) => setFilters({search: e.target.value})}
            />
            <SearchIcon className="absolute size-4 top-1/2 left-2 text-muted-foreground -translate-y-1/2"/>
        </div>
    );
};