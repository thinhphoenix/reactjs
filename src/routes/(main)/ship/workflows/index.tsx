import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/ship/workflows/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/ship/workflows/"!</div>;
}
