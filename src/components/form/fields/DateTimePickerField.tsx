"use client";

import * as React from "react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import InputsWrapper from "../../custom/inputs-wrapper";
import DateTimeFieldConfigs from "../configs/DateTimeFieldConfigs"; // create a separate config component

const DateTimePickerField = memo(function DateTimePickerField({
  data,
}: {
  data: Field;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("10:30:00");

  return (
    <InputsWrapper data={data} configs={<DateTimeFieldConfigs data={data} />}>
      <FieldGroup className="mx-auto w-full flex-row">
        <Field className="w-1/2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={`date-picker-${data.id}`}
                className="w-32 justify-between font-normal"
              >
                {date ? format(date, "PPP") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field className="w-1/2">
          <Input
            type="time"
            id={`time-picker-${data.id}`}
            step="1"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </Field>
      </FieldGroup>

      {data.helperText && (
        <p className="text-sm mt-2 text-white/90">{data.helperText}</p>
      )}
    </InputsWrapper>
  );
});

export default DateTimePickerField;
