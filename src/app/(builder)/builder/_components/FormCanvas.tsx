"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone } from "lucide-react";
import { useState, memo } from "react";
import { useBuilderStore } from "@/store/builderStore";
import FieldFactory from "@/lib/field-factory";

const widths = {
  mobile: "w-[375px]",
  desktop: "w-[1024px]",
} as const;

type DeviceType = keyof typeof widths;

const FormPreview = memo(function FormPreview({ fields }: { fields: Field[] }) {
  return (
    <>
      {fields.map((f) => (
        <FieldFactory key={f.id} field={f}  />
      ))}
    </>
  );
});

export default function FormCanvas() {
  const [device, setDevice] = useState<DeviceType>("desktop");

  const fields = useBuilderStore((s) => s.fields);
  const meta = useBuilderStore((s) => s.meta);

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* toolbar omitted */}
      <Tabs value={device} onValueChange={(v) => setDevice(v as DeviceType)}>
        <TabsList className="mx-auto flex gap-2">
          <TabsTrigger value="desktop" className="px-3 py-2">
            <Monitor className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="mobile" className="px-3 py-2">
            <Smartphone className="size-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex justify-center bg-muted p-6 rounded-xl">
        <div className={`${widths[device]} bg-white rounded-xl shadow border`}>
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>{meta.title}</CardTitle>
              <CardDescription>{meta.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <FormPreview fields={fields} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
