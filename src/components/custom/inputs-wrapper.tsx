import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoreVertical } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

const InputsWrapper = ({
  children,
  type,
  labelText,
}: {
  children: React.ReactNode;
  type: FieldType;
  labelText: string;
}) => {
  return (
    <Sheet>
      <div className="rounded-md border p-4 dark:hover:border-white hover:border-black">
        <Label className="mb-2 font-medium">
          {labelText} <span className="text-red-500 font-extrabold">*</span>{" "}
          <SheetTrigger>
            <MoreVertical className="size-4" />
          </SheetTrigger>
        </Label>
        {children}
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Edit {`${type.substring(0, 1).toUpperCase()}${type.slice(1)}`}
          </SheetTitle>
          <SheetDescription>
            Edit Configs of Your{" "}
            {`${type.substring(0, 1).toUpperCase()}${type.slice(1)}`} Element.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 text-white/87">
          <Label className="mb-2">Edit your label here</Label>
          <Input />
        </div>
        <div className="px-4 text-white/87">
          <Label className="mb-2">Helper Text</Label>
          <Input />
        </div>
        <div className="px-4 text-white/87">
          <Label className="mb-2">Placeholder Text</Label>
          <Input />
        </div>
        <Separator className="px-4" />
        <SheetTitle className="px-4 text-white/87">
          <h3>Validations</h3>
        </SheetTitle>
        <div className="px-4 text-white/87 flex justify-between">
          <Label className="mb-2">Required </Label>
          <Switch />
        </div>
        <div className="flex">
          <div className="px-4 text-white/87 flex justify-between">
            <Label className="mb-2">
              Min
              <pre className="text-[10px] font-extralight">(opt*)</pre>{" "}
            </Label>
            <Input type="number" />
          </div>
          <Separator orientation="vertical" />
          <div className="px-4 text-white/87 flex justify-between">
            <Label className="mb-2">
              Max
              <pre className="text-[10px] font-extralight">(opt*)</pre>{" "}
            </Label>
            <Input type="number" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InputsWrapper;
