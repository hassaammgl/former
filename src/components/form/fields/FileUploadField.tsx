import { memo } from "react";
import InputsWrapper from "@/components/custom/inputs-wrapper";
import { FileUpload } from "@/components/ui/file-upload";
import FileUploadConfigs from "../configs/FileUploadConfigs";
import { Field } from "@/components/ui/field";

const FileUploadField = memo(function FileUploadField({
  data,
}: {
  data: Field;
}) {
  const acceptConfig = data.config?.find((c) => c.label === "accept")?.value;
  const maxSizeConfig = data.config?.find((c) => c.label === "maxSize")?.value;

  const accept = typeof acceptConfig === "string" ? acceptConfig : undefined;
  const maxSize =
    typeof maxSizeConfig === "number" ? maxSizeConfig * 1024 * 1024 : undefined; // Convert MB to bytes

  return (
    <InputsWrapper data={data} configs={<FileUploadConfigs data={data} />}>
      <FileUpload
        onChange={(files) => console.log("Files changed:", files)}
        accept={accept}
        maxSize={maxSize}
      />
      <p className="text-sm mt-2 text-muted-foreground">{data.helperText}</p>
    </InputsWrapper>
  );
});

export default FileUploadField;
