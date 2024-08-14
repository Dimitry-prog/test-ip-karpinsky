import { useQuery } from '@tanstack/react-query';
import { getTreeById } from '@/pages/home/services';

export const useTree = (id: string) => {
  return useQuery({
    queryKey: ['tree', { id }],
    queryFn: () => getTreeById(id),
    enabled: !!id,
  });
};
