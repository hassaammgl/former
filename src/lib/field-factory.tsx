import DatePickerField from "@/components/form/fields/DatePickerField";
import DateTimePickerField from "@/components/form/fields/DateTimePickerField";
import NormalField from "@/components/form/fields/NormalInputField";
import RichTextField from "@/components/form/fields/RichTextField";
import TextAreaField from "@/components/form/fields/TextAreaField";
import { memo, ComponentType } from "react";

const FIELD_COMPONENTS: Partial<
  Record<FieldType, ComponentType<{ data: Field }>>
> = {
  text: NormalField,
  number: NormalField,
  currency: NormalField,
  email: NormalField,
  tel: NormalField,
  url: NormalField,
  time: NormalField,
  textarea: TextAreaField,
  "rich-text": RichTextField,
  date: DatePickerField,
  "datetime-local": DateTimePickerField,
};

const FieldFactory = memo(function FieldFactory({ field }: { field: Field }) {
  const Component = FIELD_COMPONENTS[field.type];
  if (!Component) return null;
  return <Component data={field} />;
});

export default FieldFactory;
