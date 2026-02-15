import { FIELD_SCHEMA } from "@/constants";

export const getFieldCategory = (type: FieldType): FieldCategory | null => {
  if (
    type === "spacer" ||
    type === "heading" ||
    type === "paragraph" ||
    type === "divider"
  ) {
    return FIELD_SCHEMA.find((f) => f.type === type)?.category as FieldCategory;
  }
  return null;
};
