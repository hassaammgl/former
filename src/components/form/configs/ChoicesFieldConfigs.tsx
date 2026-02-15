"use client";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { useBuilderStore } from "@/store/builderStore";
import { useState } from "react";

const ChoicesFieldConfigs = ({ data }: { data: Field }) => {
  const [label, setLabel] = useState(data.label ?? "");
  const [helperText, setHelperText] = useState(data.helperText ?? "");
  const [required, setRequired] = useState(data.required ?? true);
  const {
    updateField,
    fields,
    deleteField,
    addOption,
    updateOption,
    deleteOption,
  } = useBuilderStore();

  const field = fields.find((f) => f.id === data.id);
  const fieldName = `${data.type.substring(0, 1).toUpperCase()}${data.type.slice(1)}`;

  const handleSave = () => {
    updateField(data.id, {
      helperText,
      label,
      required,
    });
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit {fieldName}</SheetTitle>
        <SheetDescription>
          Edit Configs of Your {fieldName} Element.
        </SheetDescription>
      </SheetHeader>
      <div className="px-4 text-foreground">
        <Label className="mb-2">Edit your label here</Label>
        <Input value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      <div className="px-4 text-foreground">
        <Label className="mb-2">Helper Text</Label>
        <Input
          value={helperText}
          onChange={(e) => setHelperText(e.target.value)}
        />
      </div>
      <Separator className="px-4" />
      <SheetTitle className="px-4 text-foreground">Validations</SheetTitle>
      <div className="px-4 text-foreground flex justify-between">
        <Label className="mb-2">Required </Label>
        <Switch checked={required} onCheckedChange={setRequired} />
      </div>
      <div className="flex flex-col gap-2">
        {field?.options?.map((opt) => (
          <div
            key={opt.id}
            className="px-4 text-foreground flex items-center gap-2"
          >
            <Input
              value={opt.label}
              onChange={(e) =>
                updateOption(data.id, opt.id, {
                  label: e.target.value,
                  value: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
            />

            <Button
              variant="ghost"
              className="text-red-500"
              onClick={() => deleteOption(data.id, opt.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant={"outline"}
        className="mx-4"
        onClick={() => addOption(data.id)}
      >
        Add Option
      </Button>
      <SheetFooter className="flex">
        <SheetClose asChild>
          <Button
            className="text-red-400 hover:text-red-600 w-full"
            onClick={() => deleteField(data.id)}
            variant={"outline"}
          >
            Delete
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button className="w-full" onClick={handleSave}>
            Save
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default ChoicesFieldConfigs;
