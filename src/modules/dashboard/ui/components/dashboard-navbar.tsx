"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {

    const { state, toggleSidebar, isMobile} = useSidebar();
    const [ commandOpen, setCommandOpen ] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open)
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (

        <>

        <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

        <nav className="flex py-3 items-center gap-x-2 px-4 border-b bg-background">
            <Button className="size-9" variant="outline" onClick={toggleSidebar}>
                {(state === "collapsed" || isMobile) ? 
                <PanelLeftIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4"  />}
            </Button>

            <Button variant="outline" size="sm"
            className="h-9 w-[240px] font-normal justify-start hover:text-muted-foreground
            text-muted-foreground"
            onClick={()=>setCommandOpen((open) => !open)}>
                <SearchIcon />
                Search
                <kbd className="ml-auto pointer-events-none select-none gap-1 rounded
                border bg-muted px-1.5 font-mono font-medium text-[10px] text-muted-foreground">
                    <span>&#8984;</span> K
                </kbd>
            </Button>
        </nav>
        </>
    );
};