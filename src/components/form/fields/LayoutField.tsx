import { memo } from "react";
import TextFieldConfigs from "../configs/NormalFieldConfigs";
import LayoutFieldWrapper from "@/components/custom/layout-field-wrapper";
import { Separator } from "@/components/ui/separator";

const LayoutField = memo(function TextAreaField({ data }: { data: Field }) {
  return (
    <LayoutFieldWrapper data={data} configs={<TextFieldConfigs data={data} />}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The People of the Kingdom
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </p>
      <Separator />
      <div className="size-6"></div>
    </LayoutFieldWrapper>
  );
});

export default LayoutField;
