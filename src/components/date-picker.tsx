import { DropdownNavProps, DropdownProps } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DatePicker({
  date,
  onChange,
}: {
  date: Date;
  onChange: () => void;
}) {
  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <>
      <Calendar
        mode='single'
        selected={date}
        onSelect={onChange}
        timeZone='UTC'
        className='rounded-md p-2'
        classNames={{
          month_caption: 'mx-0',
        }}
        captionLayout='dropdown'
        defaultMonth={date}
        startMonth={new Date(1980, 6)}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        hideNavigation
        components={{
          DropdownNav: (props: DropdownNavProps) => {
            return (
              <div className='flex w-full items-center gap-2'>
                {props.children}
              </div>
            );
          },
          Dropdown: (props: DropdownProps) => {
            return (
              <Select
                value={String(props.value)}
                onValueChange={(value) => {
                  if (props.onChange) {
                    handleCalendarChange(value, props.onChange);
                  }
                }}
              >
                <SelectTrigger className='h-8 w-fit font-medium first:grow'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='max-h-[min(26rem,var(--radix-select-content-available-height))]'>
                  {props.options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={String(option.value)}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          },
        }}
      />
    </>
  );
}
