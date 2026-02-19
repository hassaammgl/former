import { Label } from "@/components/ui/label";
import { Field as FieldCn, FieldDescription } from "@/components/ui/field";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MySelect = ({ data }: { data: Field }) => {
  return (
    <FieldCn>
      <Label htmlFor="select-one">
        {data.label}
        {data.required && (
          <span className="text-red-500 font-extrabold">*</span>
        )}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={data.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.options?.map((opt) => (
              <SelectItem key={opt.id} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>{data.helperText}</FieldDescription>
    </FieldCn>
  );
};
