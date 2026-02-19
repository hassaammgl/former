const minMax = [
  { label: "Min", value: 0 },
  { label: "Max", value: 200 },
];

const fieldConfigsData: Partial<Record<FieldType, FieldConfigs[]>> = {
  text: minMax,
  number: minMax,
  currency: minMax,
  email: [],
  "rich-text": [],
  textarea: [{ label: "rows", value: 4 }],
  file: [
    { label: "maxSize", value: 5 },
    { label: "accept", value: "*" },
  ],
};

export function handleFields(type: FieldType) {
  return fieldConfigsData[type];
}
