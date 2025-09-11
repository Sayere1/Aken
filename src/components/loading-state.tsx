import { Loader2Icon } from "lucide-react";

interface Props {
    title: string;
    description: string;
};

export const LoadingState = ({title, description} : Props) => {
    return (
        <div className="py-4 px-8 flex flex-1 justify-center items-center">
            <div className="items-center gap-y-6 rounded-lg justify-center flex flex-col
            bg-background p-10 shadow-sm">
                <Loader2Icon className="size-6 animate-spin text-primary" />
                <div className="flex-col gap-y-2 text-center flex ">
                    <h6 className="text-lg font-medium">{title}</h6>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    )
}