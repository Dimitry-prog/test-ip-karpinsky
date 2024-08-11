import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteNodeType } from '@/pages/home/types';
import { deleteNode } from '@/pages/home/services';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ServerErrorType } from '@/shared/types';

export const useDeleteNode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteNodeType) => deleteNode(data),

    onSuccess: async () => {
      toast.success('Node has been deleted successfully');
      await queryClient.invalidateQueries({ queryKey: ['tree'] });
    },

    onError: (error) => {
      const e = error as AxiosError<ServerErrorType>;
      toast.error(e?.response?.data.data.message);
    },
  });
};
