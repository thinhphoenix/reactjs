import api from '@/helpers/axios-instance';
import i18n from '@/helpers/i18n';
import { endpoints } from '@/services/endpoints';
import { useToast } from '@/services/hooks/common/use-toast';
import type { TodoDto } from '@/types/dto/todo.dto';
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
      toast.success(i18n.t('common:loadTodosSuccess'));
    }
  }, [isSuccess, toast]);

  return { data, error, isLoading };
};
