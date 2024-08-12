import { useQuery } from '@tanstack/react-query';
import { getJournalData } from '@/pages/journal/services';
import { JournalRequestType } from '@/pages/journal/types';

export const useJournal = (data: JournalRequestType) => {
  return useQuery({
    queryKey: ['journal'],
    queryFn: () => getJournalData(data),
    refetchOnWindowFocus: false,
  });
};
