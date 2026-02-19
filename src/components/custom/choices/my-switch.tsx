import { Switch } from "@/components/ui/switch";
import {
  FieldLabel,
  Field as FieldCn,
  FieldDescription,
} from "@/components/ui/field";

export const MySwitch = ({ data }: { data: Field }) => {
  const switchId = `switch-${data.id}`;
  return (
    <FieldCn orientation="vertical">
      <div className="flex">
        <Switch id={switchId} />
        <FieldLabel htmlFor={switchId} className="ml-2">
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
