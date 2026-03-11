import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/general/')({
  component: GeneralPage,
});

function GeneralPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">General Settings</h1>
      <p className="text-muted-foreground">
        Manage general application settings.
      </p>
    </div>
  );
}
