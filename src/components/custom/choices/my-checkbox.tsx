import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldLabel,
  Field as FieldCn,
  FieldDescription,
} from "@/components/ui/field";

export const MyCheckbox = ({ data }: { data: Field }) => {
  return (
    <FieldCn orientation="vertical">
      <div className="flex">
        <Checkbox />
        <FieldLabel htmlFor="terms-checkbox-basic" className="ml-2">
          {data.label}
          {data.required && (
            <span className="text-red-500 font-extrabold">*</span>
          )}
        </FieldLabel>
      </div>
      <FieldDescription>{data.helperText}</FieldDescription>
    </FieldCn>
  );
};
