import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(main)/ai/manage-models')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div className="p-4 text-sm">Manage Models page</div>;
}
