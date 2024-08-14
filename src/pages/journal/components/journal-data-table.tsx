import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table.tsx';
import { useState } from 'react';
import { ITEMS_PER_PAGE } from '@/pages/journal/libs/constants.ts';
import JournalTablePagination from '@/pages/journal/components/journal-table-pagination.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import JournalTableDatePicker from '@/pages/journal/components/journal-table-date-picker.tsx';
import JournalTableVisibility from '@/pages/journal/components/journal-table-visibility.tsx';

type JournalDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

const JournalDataTable = <TData, TValue>({
  columns,
  data,
}: JournalDataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE[0],
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col gap-2 md:flex-row">
          <Input
            placeholder="Search by event id..."
            value={(table.getColumn('eventId')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('eventId')?.setFilterValue(event.target.value)}
            className="max-w-xs"
          />
          <JournalTableDatePicker table={table} className="w-full" />
        </div>
        <JournalTableVisibility table={table} className="w-fit" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-right">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-right">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-xl">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <JournalTablePagination table={table} className="self-end" />
    </section>
  );
};

export default JournalDataTable;
