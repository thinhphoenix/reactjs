import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/account/')({
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
      <p className="text-muted-foreground">
        Manage your account security and preferences.
      </p>
    </div>
  );
}
