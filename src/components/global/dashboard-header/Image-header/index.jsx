"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

export const FilterHeader = ({
  searchPlaceholder = "Search images...",
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  onSearch,
}) => {
  return (
    <div className="w-full rounded-sm border bg-white dark:bg-neutral-900 shadow-sm px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <Input
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((group) => (
          <DropdownMenu key={group.id}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 rounded-md"
              >
                <Filter className="h-4 w-4" />
                {group.label}
                {activeFilters[group.id] && (
                  <Badge variant="secondary" className="ml-1 rounded-sm">
                    {Array.isArray(activeFilters[group.id])
                      ? (activeFilters[group.id]).join(", ")
                      : activeFilters[group.id]}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 max-h-60 overflow-auto rounded-md"
            >
              <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {group.options.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => onFilterChange(group.id, opt.value)}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {Object.keys(activeFilters).length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground flex items-center gap-1"
            onClick={onClearAll}
          >
            <X className="h-4 w-4" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
};
