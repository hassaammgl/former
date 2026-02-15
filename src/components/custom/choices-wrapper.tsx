import React, { memo } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { MoreVertical } from "lucide-react";
import { useBuilderStore } from "@/store/builderStore";
import { cn } from "@/lib/utils";

const ChoicesFieldWrapper = memo(function ChoicesFieldWrapper({
  children,
  data,
  configs,
}: {
  children: React.ReactNode;
  data: Field;
  configs: React.ReactNode;
}) {
  const { selectField, selectedFieldId } = useBuilderStore();
  return (
    <Sheet>
      <div
        onClick={() => selectField(data.id)}
        className={cn(
          "rounded-md border p-4 dark:hover:border-white hover:border-black",
          data.id === selectedFieldId
            ? "border-2  dark:border-white border-black"
            : "",
        )}
      >
        {/* To be fixed later */}
        <SheetTrigger>
          <MoreVertical className="size-4" />
        </SheetTrigger>
        {children}
        {configs}
      </div>
    </Sheet>
  );
});

export default ChoicesFieldWrapper;
