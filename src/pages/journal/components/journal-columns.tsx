import { ColumnDef } from '@tanstack/react-table';
import { JournalType } from '@/pages/journal/types';
import { formatDateTime } from '@/shared/lib/utils.ts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { ArrowUpDown, MoreVerticalIcon } from 'lucide-react';

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
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => <div>{formatDateTime(row.getValue('createdAt')).dateTime}</div>,
  },
  {
    header: 'Options',
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View event info</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
