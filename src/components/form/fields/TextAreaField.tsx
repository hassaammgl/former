import { memo } from "react";
import InputsWrapper from "../../custom/inputs-wrapper";
import { Textarea } from "../../ui/textarea";
import TextFieldConfigs from "../configs/NormalFieldConfigs";

const TextAreaField = memo(function TextAreaField({ data }: { data: Field }) {
  const rows = data.config?.find((i) => i.label === "rows")?.value;
  return (
    <InputsWrapper data={data} configs={<TextFieldConfigs data={data} />}>
      <Textarea rows={Number(rows ?? 3)} placeholder={data.placeholder} />
      <p className="text-sm mb-2">{data.helperText}</p>
    </InputsWrapper>
  );
});

export default TextAreaField;
