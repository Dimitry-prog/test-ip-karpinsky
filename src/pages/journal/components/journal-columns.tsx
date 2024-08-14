import { ColumnDef } from '@tanstack/react-table';
import { JournalType } from '@/pages/journal/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { ArrowUpDown, MoreVerticalIcon } from 'lucide-react';
import { formatDateTime } from '@/shared/lib/utils.ts';
import { Link } from 'react-router-dom';

export const journalColumns: ColumnDef<JournalType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'eventId',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Event ID
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    filterFn: 'includesString',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-nowrap">{formatDateTime(row.getValue('createdAt')).dateTime}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));
      const { from, to } = filterValue ?? {};

      if (from && !to) {
        return date.getTime() >= from.getTime();
      } else if (!from && to) {
        return date.getTime() <= to.getTime();
      } else if (from && to) {
        return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
      }

      return true;
    },
  },
  {
    header: 'Options',
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`${row.id}`}>View event details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
