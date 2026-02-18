"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
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
import { countryCodes } from "@/lib/countryCodes"

export function CountryCodeSelect({ value, onChange }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] sm:w-[120px] justify-between px-2 sm:px-3 text-xs sm:text-sm h-10"
        >
          {value
            ? countryCodes.find((country) => country.code === value)?.code
            : "+ Code"}
          <ChevronsUpDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country code..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryCodes.map((country) => (
                <CommandItem
                  key={country.iso}
                  value={`${country.name} (${country.code})`}
                  onSelect={() => {
                    onChange(country.code)
                    setOpen(false)
                  }}
                  className="text-xs sm:text-sm cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1 truncate font-medium text-foreground">{country.name}</span>
                  <span className="ml-auto text-foreground font-semibold">{country.code}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
