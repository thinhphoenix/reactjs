import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/ship/static-and-serverless/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/ship/static-and-serverless/"!</div>;
}
