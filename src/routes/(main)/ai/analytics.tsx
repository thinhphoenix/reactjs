import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/ai/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/ai/analytics"!</div>
}
