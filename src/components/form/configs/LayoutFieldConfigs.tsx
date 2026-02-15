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
import { Button } from "../../ui/button";
import { useBuilderStore } from "@/store/builderStore";
import { useState } from "react";

const LayoutFieldConfigs = ({ data }: { data: Field }) => {
  const [innerText, setInnerText] = useState(data.innerText ?? "");
  const { updateField, deleteField } = useBuilderStore();

  const fieldName = `${data.type.substring(0, 1).toUpperCase()}${data.type.slice(1)}`;

  const handleSave = () => {
    updateField(data.id, {
      innerText,
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
      {data.type !== "spacer" && data.type !== "divider" ? (
        <div className="px-4 text-foreground">
          <Label className="mb-2">Inner Text</Label>
          <Input
            value={innerText}
            onChange={(e) => setInnerText(e.target.value)}
          />
        </div>
      ) : (
        <p className="leading-7 not-first:mt-6 mx-4">
          Nothing to configure here
        </p>
      )}
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

export default LayoutFieldConfigs;
