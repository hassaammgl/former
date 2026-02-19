import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Field as FieldCn, FieldDescription } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const MyMultiSelect = ({ data }: { data: Field }) => {
  const [open, setOpen] = useState(false);
  // Mock state for builder preview
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filteredOptions =
    data.options?.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const toggleOption = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const selectedLabels = data.options
    ?.filter((opt) => selectedValues.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <FieldCn orientation="vertical">
      <Label
        className={cn(
          data.required && !selectedValues.length && "text-destructive",
        )}
      >
        {data.label}
        {data.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 py-2"
          >
            <div className="flex flex-wrap gap-1 items-center text-left">
              {selectedLabels?.length ? (
                selectedLabels.map((label, i) => (
                  <Badge variant="secondary" key={i} className="mr-1">
                    {label}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Find value by label (not ideal but works for this mock)
                        const val = data.options?.find(
                          (o) => o.label === label,
                        )?.value;
                        if (val) toggleOption(val);
                      }}
                    />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground font-normal">
                  {data.placeholder || "Select options..."}
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <div className="p-2 border-b">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent px-2"
            />
          </div>
          <ScrollArea className="h-[200px] p-1">
            {filteredOptions.length === 0 ? (
              <p className="p-2 text-sm text-muted-foreground text-center">
                No options found.
              </p>
            ) : (
              <div className="space-y-1">
                {filteredOptions.map((opt) => {
                  const isSelected = selectedValues.includes(opt.value);
                  return (
                    <div
                      key={opt.id}
                      className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
                        isSelected && "bg-accent text-accent-foreground",
                      )}
                      onClick={() => toggleOption(opt.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      <span>{opt.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <FieldDescription>{data.helperText}</FieldDescription>
    </FieldCn>
  );
};
