import { beforeEach, describe, expect, test, vi } from 'vitest';
import { JournalSingleType } from '@/pages/journal-single/types';
import { getJournalById } from '@/pages/journal-single/services';
import { waitFor } from '@testing-library/react';
import { useJournalSingle } from '@/pages/journal-single/hooks/use-journal-single.ts';
import { renderHookWithProviders } from '@/shared/lib/tests.tsx';

vi.mock('@/pages/journal-single/services', () => ({
  getJournalById: vi.fn(),
}));

describe('useJournalSingle hook', () => {
  const mockJournalSingleData: JournalSingleType = {
    id: 0,
    createdAt: '2024-08-12T16:34:38.3776711Z',
    eventId: '12345',
    text: 'This is a test journal entry.\r\nIt has multiple lines.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch journal data when id is provided', async () => {
    (getJournalById as vi.Mock).mockResolvedValueOnce(mockJournalSingleData);

    const { result } = renderHookWithProviders(() => useJournalSingle('0'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockJournalSingleData);
    expect(getJournalById).toHaveBeenCalledWith('0');
    expect(getJournalById).toHaveBeenCalledTimes(1);
  });

  test('should not fetch journal data when id is not provided', () => {
    const { result } = renderHookWithProviders(() => useJournalSingle(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(false);
  });

  test('should handle errors from getJournalById', async () => {
    (getJournalById as vi.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHookWithProviders(() => useJournalSingle('1'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(new Error('Network Error'));
  });
});
