import { useListTodos } from '@/services/hooks/todo/use-list-todos';
import type { TodoDto } from '@/types/dto/todo.dto';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Row } from 'antd';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [enabled, setEnabled] = useState(false);
  const { data, error, isLoading } = useListTodos(enabled);

  const handleClick = () => {
    setEnabled(true);
  };

  return (
    <Row className="p-4">
      <Button onClick={handleClick} variant="solid" color="primary">
        {isLoading ? 'Loading...' : 'Load Todos'}
      </Button>
      {data && (
        <Row className="todo">
          {error && <p>{error.message}</p>}
          {(data as any).map((todo: TodoDto) => {
            return <p key={todo.id}>{todo.title}</p>;
          })}
        </Row>
      )}
    </Row>
  );
}
