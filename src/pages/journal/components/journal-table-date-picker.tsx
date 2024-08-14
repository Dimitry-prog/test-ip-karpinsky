import { PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, XIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent } from '@/shared/components/ui/popover.tsx';
import { cn } from '@/shared/lib/utils.ts';
import { Button } from '@/shared/components/ui/button.tsx';
import { Calendar } from '@/shared/components/ui/calendar.tsx';
import { Table } from '@tanstack/react-table';

type JournalTableDatePickerProps<TData> = {
  table: Table<TData>;
  className?: string;
};

const JournalTableDatePicker = <TData,>({
  className,
  table,
}: JournalTableDatePickerProps<TData>) => {
  const value = table.getColumn('createdAt')?.getFilterValue() as DateRange | undefined;

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'max-w-xs justify-between pr-1 text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <div className="flex items-center gap-1">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, 'MMM dd, y')} - {format(value.to, 'MMM dd, y')}
                  </>
                ) : (
                  format(value.from, 'MMM dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>

            {value && (
              <XIcon
                className="p-1 hover:stroke-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  table.getColumn('createdAt')?.setFilterValue('');
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={(date) => {
              table.getColumn('createdAt')?.setFilterValue(date);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default JournalTableDatePicker;
