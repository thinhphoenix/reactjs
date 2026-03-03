import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '@/helpers/axios-instance';
import i18n from '@/helpers/i18n';
import type { TodoDto } from '@/routes/~shared/dto/todo.dto';
import { endpoints } from '../../endpoints';
import { useToast } from '../common/use-toast';

export const useListTodos = (enabled: boolean) => {
  const toast = useToast();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: [endpoints.todos.list],
    queryFn: () => api.get<TodoDto[]>(endpoints.todos.list),
    enabled,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(i18n.t('common:loadTodosSuccess'));
    }
  }, [isSuccess, toast]);

  return { data, error, isLoading };
};
