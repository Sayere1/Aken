import { Button } from "@/components/ui/button";


interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
    return (
        <div className="items-center justify-between flex">
            <div className="text-muted-foreground flex-1 text-sm">
                Page {page} of {totalPages || 1}
            </div>
            <div className="justify-end flex items-center space-x-2 py-4">
                <Button disabled={page === 1} variant="outline" size="sm"
                    onClick={() => onPageChange(Math.max(1, page - 1))} >
                        Previous
                </Button>
                <Button disabled={page === totalPages || totalPages === 0} 
                variant="outline" size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))} >
                        Next
                </Button>
            </div>
        </div>
    );
};