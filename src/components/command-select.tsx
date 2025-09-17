import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { CommandEmpty, CommandInput, CommandItem,
    CommandList, CommandResponsiveDialog
} from "@/components/ui/command";


interface Props {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>;

    onSelect: (value: string) => void;
    OnSearch: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
};


export const CommandSelect = ({
    options, onSelect, OnSearch,
    value, placeholder, className } : Props) => {
        const [ open, setOpen ] = useState(false);
        const selectedOptions = options.find((option) => option.value === value);

        const handleOpenChange = (open: boolean) => {
            OnSearch?.("");
            setOpen(open);
        }
        
        return (
            <>
            <Button type="button" variant="outline" onClick={() => setOpen(true)}
            className={cn("h-9 px-2 font-normal justify-between", !selectedOptions && "text-muted-foreground", className)}>
                <div>
                    {selectedOptions?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>

            <CommandResponsiveDialog shouldFilter={!OnSearch} open={open} onOpenChange={handleOpenChange}>
                <CommandInput placeholder="Search..." onValueChange={OnSearch}/> 
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">No options found</span>
                    </CommandEmpty>
                    {options.map((option) => (
                        <CommandItem key={option.id} onSelect={() => {
                            onSelect(option.value)
                            setOpen(false);
                        }}>
                            {option.children}
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog>
            </>
        )
}