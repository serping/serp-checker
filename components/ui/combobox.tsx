"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Props = {
  className?: string;
  defaultValue?: string;
  onValueChange?: (currentValue: string) => void;
  placeholder?: string;
  defaultSelectLabel?: string;
  frameworks:{
    disabled?: boolean;
    icon?: React.ReactNode;
    value: string;
    label: string;
  }[]
}
export function Combobox({
  className,
  defaultValue = "",
  frameworks,
  placeholder = 'Search',
  defaultSelectLabel= 'Select ...',
  onValueChange
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);
 
 
  useEffect(() => {
    if(onValueChange) onValueChange(value);
  }, [value]);

  useEffect(() => {
    if (buttonRef.current) {
      setContentWidth(buttonRef.current.offsetWidth);
    }
  }, [buttonRef.current]);
  const currentFramework = useMemo(()=>{
    return frameworks.find((framework) => framework.value === value)
  }, [value])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          ref={buttonRef}
          variant="outline"
          role="combobox" 
          aria-expanded={open}
          className={cn("justify-between px-4", className)}
        >
          {value
          ? (
            <span className="flex items-center">
              {(currentFramework?.icon ? currentFramework?.icon : null)}
              <span className={currentFramework?.icon ? "ml-2" : ""}>{currentFramework?.label}</span>
            </span>
            )
            : defaultSelectLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)} style={{ width: contentWidth }}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  disabled={framework.disabled ?? false}
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
