import FieldsSelectMenu from "./builder/_components/FieldsSelectMenu";

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FieldsSelectMenu>{children}</FieldsSelectMenu>;
}
