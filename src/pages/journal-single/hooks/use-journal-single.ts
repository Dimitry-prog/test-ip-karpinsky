import { useQuery } from '@tanstack/react-query';
import { getJournalById } from '@/pages/journal-single/services';

export const useJournalSingle = (id: string) => {
  return useQuery({
    queryKey: ['journalSingle', { id }],
    queryFn: () => getJournalById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
