import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/authorize/role')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="p-4 text-sm">Authorize role page</div>;
}
