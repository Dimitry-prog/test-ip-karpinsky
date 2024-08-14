import { JournalRequestType, JournalType } from '@/pages/journal/types';

export const INIT_JOURNAL_REQUEST: JournalRequestType = {
  skip: 0,
  take: 10,
  filter: {},
};

export const INIT_JOURNAL_DATA: JournalType[] = [
  {
    id: 0,
    eventId: 0,
    createdAt: '2024-08-12T16:34:38.3776711Z',
  },
  {
    id: 1,
    eventId: 1,
    createdAt: '2024-07-12T16:34:38.3776711Z',
  },
  {
    id: 2,
    eventId: 2,
    createdAt: '2024-06-12T16:34:38.3776711Z',
  },
  {
    id: 3,
    eventId: 3,
    createdAt: '2024-08-20T16:34:38.3776711Z',
  },
  {
    id: 4,
    eventId: 4,
    createdAt: '2024-08-10T16:34:38.3776711Z',
  },
  {
    id: 5,
    eventId: 5,
    createdAt: '2024-08-09T16:34:38.3776711Z',
  },
];

export const ITEMS_PER_PAGE: number[] = [2, 4, 6, 8, 10];
