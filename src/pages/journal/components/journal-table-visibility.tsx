import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Table } from '@tanstack/react-table';
import { cn } from '@/shared/lib/utils.ts';

type JournalTableVisibilityProps<TData> = {
  table: Table<TData>;
  className?: string;
};

const JournalTableVisibility = <TData,>({
  table,
  className,
}: JournalTableVisibilityProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button variant="outline">View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JournalTableVisibility;
