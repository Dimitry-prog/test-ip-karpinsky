import { PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';
import { Popover, PopoverContent } from '@/shared/components/ui/popover.tsx';
import { cn } from '@/shared/lib/utils.ts';
import { Button } from '@/shared/components/ui/button.tsx';
import { Calendar } from '@/shared/components/ui/calendar.tsx';

type JournalTableDatePickerProps = {
  className?: string;
};

const JournalTableDatePicker = ({ className }: JournalTableDatePickerProps) => {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'max-w-xs justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'MMM dd, y')} - {format(date.to, 'MMM dd, y')}
                </>
              ) : (
                format(date.from, 'MMM dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default JournalTableDatePicker;
