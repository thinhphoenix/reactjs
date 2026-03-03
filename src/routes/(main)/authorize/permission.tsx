import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/authorize/permission')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="p-4 text-sm">Authorize permission page</div>;
}
