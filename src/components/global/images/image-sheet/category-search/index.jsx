"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useImage } from "@/store/hooks/useImage";

export function CategorySearch({ category, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(category || "");
  const [search, setSearch] = React.useState("");

  const { categories, getCategories, addCategory } = useImage();

  const options = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = async () => {
    if (!search.trim()) return;
    const newCat = await addCategory({ name: search.trim() });
    setValue(newCat?._id || "");
    setSearch("");
    setOpen(false);
    getCategories();
    if (onChange) onChange(newCat?._id || "");
  };

  const handleSelect = (selectedValue) => {
    setValue(selectedValue === value ? "" : selectedValue);
    setOpen(false);
    if (onChange) onChange(selectedValue === value ? "" : selectedValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value}
          {value
            ? options.find((opt) => opt.value === value)?.label
            : "Select category..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {filteredOptions.length === 0 && search.trim() !== "" && (
              <CommandItem onSelect={handleAddCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add "{search}"
              </CommandItem>
            )}
            <CommandGroup>
              {filteredOptions.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => handleSelect(opt.value)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
