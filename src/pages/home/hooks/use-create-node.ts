import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNodeType } from '@/pages/home/types';
import { createNode } from '@/pages/home/services';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ServerErrorType } from '@/shared/types';

export const useCreateNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNodeType) => createNode(data),

    onSuccess: async () => {
      toast.success('Node has been created successfully');
      await queryClient.invalidateQueries({ queryKey: ['tree'] });
    },

    onError: (error) => {
      const e = error as AxiosError<ServerErrorType>;
      toast.error(e?.response?.data.data.message);
    },
  });
};
