'use client';

import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQueryMultiple } from '@/lib/url';

function DailyReportDate({ initialDate }: { initialDate?: Date }) {
  const [date, setDate] = React.useState<Date | undefined>(
    initialDate || new Date()
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDateSelect = (selecdateDate: Date | undefined) => {
    if (!selecdateDate) return;

    const year = selecdateDate.getFullYear();
    const month = selecdateDate.getMonth();
    const day = selecdateDate.getDate();

    const newUrl = formUrlQueryMultiple({
      params: searchParams.toString(),
      keyValueArray: [
        { key: 'year', value: year.toString() },
        { key: 'month', value: month.toString() },
        { key: 'day', value: day.toString() },
      ],
    });

    router.push(newUrl, { scroll: false });

    setDate(selecdateDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {date ? format(date, 'PPP') : 'Select Date'}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 background-light900_dark200 light-border"
        align="end"
      >
        {/* <Calendar
          mode="single"
          selected={date} // Ensure selected date is passed correctly
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate); // Update state with selected date
            }
          }}
          initialFocus
          className="rounded-md border"
          today={date}
          defaultMonth={date}
        /> */}

        <DayPicker mode="single" selected={date} onSelect={handleDateSelect} />
      </PopoverContent>
    </Popover>
  );
}

export default DailyReportDate;
