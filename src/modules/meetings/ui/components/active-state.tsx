import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon } from "lucide-react";


interface Props {
    meetingId: string;

}

export const ActiveState = ({ meetingId } : Props) => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex-col flex items-center gap-y-8 justify-center">
            <EmptyState image="/upcoming.svg" title="Meeting is active"
                description="This meeting will automatically end when there are no participant left" />

            <div className="flex-col-reverse flex lg:justify-center lg:flex-row items-center gap-2 w-full ">
                <Button asChild className="w-full lg:w-auto">
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon />
                        Join Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};