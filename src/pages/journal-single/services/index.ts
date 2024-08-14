import { axiosInstance } from '@/shared/lib/api.ts';
import { JournalSingleType } from '@/pages/journal-single/types';

export const getJournalById = async (id: string) => {
  const journalData = await axiosInstance.post<JournalSingleType>(
    `api.user.journal.getSingle?id=${id}`
  );
  return journalData.data;
};
