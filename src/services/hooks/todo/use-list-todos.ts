import api from '@/helpers/axios-instance';
import { endpoints } from '@/services/endpoints';
import { useToast } from '@/services/hooks/common/use-toast';
import type { TodoDto } from '@/types/dtos/todo.dto';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useListTodos = (enabled: boolean) => {
  const toast = useToast();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: [endpoints.todos.list],
    queryFn: () => api.get<TodoDto[]>(endpoints.todos.list),
    enabled,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Todos loaded successfully');
    }
  }, [isSuccess, toast]);

  return { data, error, isLoading };
};
