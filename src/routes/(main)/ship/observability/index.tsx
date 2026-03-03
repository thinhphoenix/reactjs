import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/ship/observability/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/ship/observability/"!</div>;
}
