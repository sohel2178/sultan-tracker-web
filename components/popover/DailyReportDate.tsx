'use client';

import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';
import 'react-day-picker/style.css';

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

function DailyReportDate({ date, setDate }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => setOpen((prev) => !prev)}>
          {date ? format(date, 'PPP') : 'Select Date'}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-4 background-light900_dark200 light-border"
        align="end"
      >
        <DayPicker
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate); // Update state with selected date
              setOpen(false); // Close Popover
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DailyReportDate;
