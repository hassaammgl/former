import { cn } from "@/lib/utils";
import InputsWrapper from "../../custom/inputs-wrapper";
import { Input } from "../../ui/input";
import NormalFieldConfigs from "../configs/NormalFieldConfigs";
import { Field } from "@/components/ui/field";
import { fieldsIcons, fieldsIdentifier } from "@/lib/field-identifier";
import { memo } from "react";

const NormalField = memo(function NormalField({ data }: { data: Field }) {
  return (
    <InputsWrapper data={data} configs={<NormalFieldConfigs data={data} />}>
      {/* // TODO: if user type any other thing except numbers automatically ignore
      it. */}
      <Field orientation={"horizontal"}>
        {fieldsIcons(data.type)}
        <Input
          type={fieldsIdentifier(data.type)}
          placeholder={data.placeholder}
          className={cn(
            "",
            data.type === "time"
              ? "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              : "",
          )}
        />
      </Field>
      <p className="text-sm mt-2 text-white/90">{data.helperText}</p>
    </InputsWrapper>
  );
});

export default NormalField;
