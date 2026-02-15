import ChoicesFields from "@/components/form/fields/ChoicesFields";
import DatePickerField from "@/components/form/fields/DatePickerField";
import DateTimePickerField from "@/components/form/fields/DateTimePickerField";
import LayoutField from "@/components/form/fields/LayoutField";
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
  heading: LayoutField,
  paragraph: LayoutField,
  divider: LayoutField,
  spacer: LayoutField,
  switch: ChoicesFields,
  checkbox: ChoicesFields,
  radio: ChoicesFields,
  select: ChoicesFields,
  multiselect: ChoicesFields,
};

const FieldFactory = memo(function FieldFactory({ field }: { field: Field }) {
  const Component = FIELD_COMPONENTS[field.type];
  if (!Component) return null;
  return <Component data={field} />;
});

export default FieldFactory;
