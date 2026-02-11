import { Clock, DollarSign, Hash, Link, Mail, Phone } from "lucide-react";
import type { JSX } from "react";

const fieldsIdentifierData: Partial<Record<FieldType, string>> = {
  text: "text",
  currency: "number",
  number: "number",
  email: "email",
  tel: "tel",
  url: "url",
  time: "time",
};

export const fieldsIdentifier = (type: FieldType) => {
  return fieldsIdentifierData[type];
};

const fieldsIconsData: Partial<Record<FieldType, string | JSX.Element>> = {
  text: "",
  currency: <DollarSign />,
  number: <Hash />,
  email: <Mail />,
  tel: <Phone />,
  url: <Link />,
  time: <Clock />,
};
export const fieldsIcons = (type: FieldType) => {
  return fieldsIconsData[type];
};
