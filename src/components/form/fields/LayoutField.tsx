import { memo } from "react";
import LayoutFieldWrapper from "@/components/custom/layout-field-wrapper";
import { Separator } from "@/components/ui/separator";
import LayoutFieldConfigs from "../configs/LayoutFieldConfigs";

const LayoutField = memo(function LayoutField({ data }: { data: Field }) {
  return (
    <LayoutFieldWrapper
      data={data}
      configs={<LayoutFieldConfigs data={data} />}
    >
      {data.type === "heading" && (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {data.innerText}
        </h2>
      )}
      {data.type === "paragraph" && (
        <p className="leading-7 not-first:mt-6">{data.innerText}</p>
      )}
      {data.type === "divider" && <Separator />}
      {data.type === "spacer" && <div className="size-6"></div>}
    </LayoutFieldWrapper>
  );
});

export default LayoutField;
