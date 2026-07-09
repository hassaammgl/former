import FormCanvas from "../_components/FormCanvas";
// is main form data fetch kar ke edit wala stuff karna ha
export default function BuilderPage() {
  return (
    <div className="h-screen w-full bg-background overflow-scroll p-4 mb-4">
      <FormCanvas />
    </div>
  );
}
