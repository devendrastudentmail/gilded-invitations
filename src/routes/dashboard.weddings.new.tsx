import { createFileRoute } from "@tanstack/react-router";
import { WeddingWizard } from "@/components/dashboard/WeddingWizard";

export const Route = createFileRoute("/dashboard/weddings/new")({
  component: NewWedding,
});

function NewWedding() {
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-bold">Create a new wedding</h1>
      <WeddingWizard />
    </div>
  );
}
