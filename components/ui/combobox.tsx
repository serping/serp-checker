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
import { ComboboxFramework } from "@/shema"

 
type Props = {
  className?: string;
  inputClassName?: string;
  canCancel?: boolean;
  defaultValue?: string;
  onInputValueChange?: (currentValue: string) => void;
  onValueChange?: (currentValue: string) => void;
  placeholder?: string;
  defaultSelectLabel?: string;
  defaultSelectIcon?: React.ReactNode;
  frameworks: ComboboxFramework[]
}
export function Combobox({
  className,
  defaultValue = "",
  frameworks,
  placeholder = 'Search',
  defaultSelectLabel = 'Select ...',
  defaultSelectIcon,
  canCancel = false,
  onValueChange,
  onInputValueChange
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
  }, [value]);

  const CurrentLabel =()=>{
    if(value){
      const label = currentFramework?.short_label || currentFramework?.label;
      return(
        <span className="flex items-center">
         {currentFramework?.icon ? currentFramework?.icon : null}
         <span className={currentFramework?.icon ? "ml-2" : ""}>{label}</span>
        </span> 
      )
    }else{
      return(
        <span className="flex items-center">{defaultSelectIcon ?  defaultSelectIcon : null  }<span className={defaultSelectIcon ? "ml-2" : ""}>{defaultSelectLabel}</span></span> 
      )
    }
  }

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
          <CurrentLabel />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className)} style={{ width: contentWidth }}>
        <Command>
          <CommandInput onValueChange={ onInputValueChange } placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  disabled={framework.disabled ?? false}
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    if(canCancel){
                      setValue(currentValue === value ? "" : currentValue)
                    }else{
                      setValue(currentValue) 
                    }
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
