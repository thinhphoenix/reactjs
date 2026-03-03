import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/authorize/user')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="p-4 text-sm">Authorize user page</div>;
}
