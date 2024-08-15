import { beforeEach, describe, expect, test, vi } from 'vitest';
import { JournalSingleType } from '@/pages/journal-single/types';
import { axiosInstance } from '@/shared/lib/api.ts';
import { getJournalById } from '@/pages/journal-single/services';

vi.mock('@/shared/lib/api.ts', () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe('getJournalById fetch', () => {
  const mockJournalData: JournalSingleType = {
    id: 0,
    createdAt: '2024-08-12T16:34:38.3776711Z',
    eventId: '12345',
    text: 'This is a test journal entry.\r\nIt has multiple lines.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch journal data ', async () => {
    (axiosInstance.post as vi.Mock).mockResolvedValueOnce({
      data: mockJournalData,
    });

    const result = await getJournalById('1');

    expect(result).toEqual(mockJournalData);
    expect(axiosInstance.post).toHaveBeenCalledWith('api.user.journal.getSingle?id=1');
  });

  test('should handle errors', async () => {
    (axiosInstance.post as vi.Mock).mockRejectedValueOnce(new Error('Network Error'));

    try {
      await getJournalById('1');
    } catch (error) {
      expect(error).toEqual(new Error('Network Error'));
    }
  });
});
