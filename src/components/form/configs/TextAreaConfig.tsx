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

const TextAreaFieldConfigs = ({ data }: { data: Field }) => {
  const [label, setLabel] = useState(data.label ?? "");
  const [helperText, setHelperText] = useState(data.helperText ?? "");
  const [placeholderText, setPlaceholderText] = useState(
    data.placeholder ?? "",
  );
  const [required, setRequired] = useState(data.required);
  const [config, setConfig] = useState<FieldConfigs[]>(data.config ?? []);
  const { updateField, deleteField } = useBuilderStore();

  const fieldName = `${data.type.substring(0, 1).toUpperCase()}${data.type.slice(1)}`;

  const handleSave = () => {
    updateField(data.id, {
      helperText,
      label,
      placeholder: placeholderText,
      required,
      config,
    });
  };

  const handleConfigsChange = (label: string, value: string) => {
    setConfig((prev) =>
      prev.map((c) => (c.label === label ? { ...c, value: value } : c)),
    );
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
      <div className="px-4 text-foreground">
        <Label className="mb-2">Placeholder Text</Label>
        <Input
          value={placeholderText}
          onChange={(e) => setPlaceholderText(e.target.value)}
        />
      </div>
      <Separator className="px-4" />
      <SheetTitle className="px-4 text-foreground">Validations</SheetTitle>
      <div className="px-4 text-foreground flex justify-between">
        <Label className="mb-2">Required </Label>
        <Switch checked={required} onCheckedChange={setRequired} />
      </div>
      <div className="flex">
        {config?.map((confs, i) => (
          <div key={i} className="px-4 text-foreground flex justify-between">
            <Label className="mb-2">{confs.label}</Label>
            <Input
              type="number"
              value={Number(confs.value)}
              onChange={(e) => handleConfigsChange(confs.label, e.target.value)}
            />
          </div>
        ))}
      </div>
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

export default TextAreaFieldConfigs;
