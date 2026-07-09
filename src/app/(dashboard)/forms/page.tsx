"use client";

import Filters from "./_components/Filters";
import FormsList from "./_components/FormsList";

export default function FormsPage() {
  return (
    <div className="w-full px-4">
      <Filters />
      {/* Forms list */}
      <FormsList />
    </div>
  );
}
