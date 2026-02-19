import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FieldLabel,
  Field as FieldCn,
  FieldDescription,
} from "@/components/ui/field";

export const MyRadio = ({ data }: { data: Field }) => {
  return (
    <FieldCn orientation="vertical">
      <FieldLabel className="mb-2">
        {data.label}
        {data.required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <RadioGroup className="flex flex-col gap-2">
        {data.options?.map((opt) => (
          <div key={opt.id} className="flex items-center space-x-2">
            <RadioGroupItem value={opt.value} id={`${data.id}-${opt.id}`} />
            <FieldLabel htmlFor={`${data.id}-${opt.id}`} className="font-normal">
              {opt.label}
            </FieldLabel>
          </div>
        ))}
      </RadioGroup>
      <FieldDescription>{data.helperText}</FieldDescription>
    </FieldCn>
  );
};
