import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/profile/')({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Profile Settings</h1>
      <p className="text-muted-foreground">
        Manage your profile information and preferences.
      </p>
    </div>
  );
}
