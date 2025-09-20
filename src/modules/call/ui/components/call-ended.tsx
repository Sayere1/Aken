

import { Button } from "@/components/ui/button";


import Link from "next/link";



export const CallEnded = () => {

    return (
        <div className="flex flex-col h-screen
        justify-center bg-radial items-center from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center gap-y-6 justify-center 
                shadow-sm bg-background rounded-lg p-10">
                    <div className="text-center gap-y-2 flex flex-col">
                        <h6 className="text-lg font-medium">you have ended the call</h6>
                        <p className="text-sm">Summary will appear in a few minutes</p>
                    </div>
                    <Button asChild>
                        <Link href="/meetings">Back to meetings</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};