import TextField from "@/components/form/TextField";

export default function FieldFactory({ type }: { type: FieldType }) {
  switch (type) {
    case "text":
      return <TextField />;

    default:
      return "Wrong element";
  }
}
