import { JournalRequestType, JournalResponseType } from '@/pages/journal/types';
import { axiosInstance } from '@/shared/lib/api.ts';

export const getJournalData = async (data: JournalRequestType) => {
  const journalData = await axiosInstance.post<JournalResponseType>(
    `api.user.journal.getRange?skip=${data.skip}&take=${data.take}`,
    data.filter
  );
  return journalData.data;
};
