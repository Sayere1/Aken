import { EmptyState } from "@/components/empty-state";



export const CancelState = () => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex-col flex items-center gap-y-8 justify-center">
            <EmptyState image="/cancelled.svg" title="Meeting cancelled"
                description="This meeting was cancelled" />
        </div>
    );
};