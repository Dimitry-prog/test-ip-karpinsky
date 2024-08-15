import { describe, expect, test, vi } from 'vitest';
import JournalSinglePage from '@/pages/journal-single';
import ReactRouterDOM, { MemoryRouter } from 'react-router-dom';
import { useJournalSingle } from '@/pages/journal-single/hooks/use-journal-single.ts';
import { render, screen } from '@testing-library/react';
import { JournalSingleType } from '@/pages/journal-single/types';
import { formatDateTime } from '@/shared/lib/utils.ts';
import { userEvent } from '@testing-library/user-event';

const navigateMock = vi.fn();
vi.mock('@/pages/journal-single/hooks/use-journal-single.ts');
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof ReactRouterDOM>('react-router-dom')),
  useNavigate: () => navigateMock,
}));

type UseJournalSingleReturnType = {
  data: JournalSingleType | null;
  isLoading: boolean;
  isError: boolean;
  error?: { message: string };
};

describe('JournalSinglePage', () => {
  const mockUseJournalSingle = useJournalSingle as vi.Mock<UseJournalSingleReturnType>;

  test('should render loading', async () => {
    mockUseJournalSingle.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(
      <MemoryRouter initialEntries={['/journal/10']}>
        <JournalSinglePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should render error message', async () => {
    mockUseJournalSingle.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
      error: {
        message: 'Failed to fetch',
      },
    });

    render(
      <MemoryRouter initialEntries={['/journal/10']}>
        <JournalSinglePage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Failed to fetch/)).toBeInTheDocument();
  });

  test('should render journal data', async () => {
    const mockData = {
      createdAt: '2024-08-12T16:34:38.3776711Z',
      eventId: '12345',
      text: 'This is a test journal entry.\r\nIt has multiple lines.',
    };

    mockUseJournalSingle.mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    render(
      <MemoryRouter initialEntries={['/journal/10']}>
        <JournalSinglePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Created at:/)).toBeInTheDocument();
    expect(screen.getByText(`${formatDateTime(mockData.createdAt).dateTime}`)).toBeInTheDocument();
    expect(screen.getByText(/Event ID:/)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.eventId}`)).toBeInTheDocument();
    expect(screen.getByText(/This is a test journal entry/)).toBeInTheDocument();
    expect(screen.getByText(/It has multiple lines/)).toBeInTheDocument();
  });

  test('should not render journal data when no data is available', async () => {
    mockUseJournalSingle.mockReturnValue({
      isLoading: false,
      isError: false,
      data: null,
    });

    render(
      <MemoryRouter initialEntries={['/journal/10']}>
        <JournalSinglePage />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Created at:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Event ID:/)).not.toBeInTheDocument();
  });

  test('should navigate back to journal when Back button clicked', async () => {
    mockUseJournalSingle.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        createdAt: '2024-08-12T16:34:38.3776711Z',
        eventId: '12345',
        text: 'This is a test journal entry.\r\nIt has multiple lines.',
      },
    });

    render(
      <MemoryRouter initialEntries={['/journal/10']}>
        <JournalSinglePage />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /Back/i });
    expect(backButton).toBeInTheDocument();

    await userEvent.click(backButton);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/journal');
  });
});
