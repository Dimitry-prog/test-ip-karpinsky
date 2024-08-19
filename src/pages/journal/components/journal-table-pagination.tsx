import { Input } from '@/shared/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select.tsx';
import { ITEMS_PER_PAGE } from '@/pages/journal/libs/constants.ts';
import { Button } from '@/shared/components/ui/button.tsx';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils.ts';
import { Table } from '@tanstack/react-table';

type JournalTablePaginationProps<TData> = {
  table: Table<TData>;
  className?: string;
};

const JournalTablePagination = <TData,>({
  table,
  className,
}: JournalTablePaginationProps<TData>) => {
  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <div className="flex items-center gap-1">
        <p>Go to page:</p>
        <Input
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          type="number"
          min="1"
          max={table.getPageCount()}
          className="w-fit"
        />
      </div>

      <div className="hidden items-center gap-1 sm:flex">
        <p>Page</p>
        <p className="font-semibold">{table.getState().pagination.pageIndex + 1} of</p>
        <p className="font-semibold">{table.getPageCount().toLocaleString()}</p>
      </div>

      <div className="hidden items-center gap-1 md:flex">
        <p>Rows per page:</p>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent>
            {ITEMS_PER_PAGE.map((item) => (
              <SelectItem value={item.toString()} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden space-x-1 md:block">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeftIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          data-testid="prev button"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          data-testid="next button"
        >
          <ChevronRightIcon className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default JournalTablePagination;
