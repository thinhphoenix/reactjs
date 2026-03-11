import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/accessibility/')({
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Accessibility Settings</h1>
      <p className="text-muted-foreground">Customize accessibility options.</p>
    </div>
  );
}
