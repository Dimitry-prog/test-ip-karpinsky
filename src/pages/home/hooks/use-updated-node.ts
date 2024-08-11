import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateNodeType } from '@/pages/home/types';
import { updateNode } from '@/pages/home/services';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ServerErrorType } from '@/shared/types';

export const useUpdatedNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateNodeType) => updateNode(data),

    onSuccess: async () => {
      toast.success('Node has been updated successfully');
      await queryClient.invalidateQueries({ queryKey: ['tree'] });
    },

    onError: (error) => {
      const e = error as AxiosError<ServerErrorType>;
      toast.error(e?.response?.data.data.message);
    },
  });
};
