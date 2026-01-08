import i18n from '@/helpers/i18n';
import { useListTodos } from '@/services/hooks/todo/use-list-todos';
import type { TodoDto } from '@/types/dto/todo.dto';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Col, Row } from 'antd';
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
    <Col className="p-4">
      <Row>
        <Button
          onClick={handleClick}
          variant="solid"
          color="primary"
          loading={isLoading}
        >
          {i18n.t('common:loadTodos')}
        </Button>
      </Row>
      {data && (
        <Row className="todo">
          {error && <p>{error.message}</p>}
          {(data as any).map((todo: TodoDto) => {
            return <p key={todo.id}>{todo.title}</p>;
          })}
        </Row>
      )}
    </Col>
  );
}
