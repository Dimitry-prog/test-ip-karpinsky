import { describe, expect, test } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderComponentWithProviders } from '@/shared/lib/tests.tsx';
import JournalDataTable from '@/pages/journal/components/journal-data-table.tsx';
import { JournalType } from '@/pages/journal/types';
import { formatDateTime } from '@/shared/lib/utils.ts';
import { journalColumns } from '@/pages/journal/components/journal-columns.tsx';

const mockData: JournalType[] = [
  { id: 1, createdAt: '2024-08-12T16:34:38.3776711Z', eventId: 1 },
  { id: 2, createdAt: '2024-07-12T16:34:38.3776711Z', eventId: 2 },
  { id: 3, createdAt: '2024-06-12T16:34:38.3776711Z', eventId: 3 },
];

describe('JournalDataTable', () => {
  test('should render table with correct columns and data', () => {
    renderComponentWithProviders(<JournalDataTable columns={journalColumns} data={mockData} />);

    const idHeader = screen.getByRole('columnheader', { name: 'ID' });
    expect(idHeader).toBeInTheDocument();

    const eventIdHeader = screen.getByRole('columnheader', { name: 'Event ID' });
    expect(eventIdHeader).toBeInTheDocument();

    const createdAtHeader = screen.getByRole('columnheader', { name: 'Created At' });
    expect(createdAtHeader).toBeInTheDocument();

    const optionsHeader = screen.getByRole('columnheader', { name: 'Options' });
    expect(optionsHeader).toBeInTheDocument();

    expect(screen.getAllByRole('cell', { name: '1' }).length).toBe(2);
    expect(screen.getAllByRole('cell', { name: '2' }).length).toBe(2);
    expect(
      screen.getByRole('cell', { name: formatDateTime(mockData[0].createdAt).dateTime })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: formatDateTime(mockData[1].createdAt).dateTime })
    ).toBeInTheDocument();
  });

  test('should filter data based on eventId input', () => {
    renderComponentWithProviders(<JournalDataTable columns={journalColumns} data={mockData} />);

    const input = screen.getByPlaceholderText('Search by event id...');

    fireEvent.change(input, { target: { value: '2' } });
    expect(screen.getAllByRole('cell', { name: '2' }).length).toBe(2);
  });

  test('should sort data when column header is clicked', async () => {
    renderComponentWithProviders(<JournalDataTable columns={journalColumns} data={mockData} />);

    const idHeader = screen.getByRole('columnheader', { name: 'ID' });
    await userEvent.click(idHeader);

    const rows = screen.getAllByRole('row');

    expect(rows[1]).toHaveTextContent('1');
    expect(rows[2]).toHaveTextContent('2');

    await userEvent.click(idHeader);
    expect(rows[1]).toHaveTextContent('2');
    expect(rows[2]).toHaveTextContent('1');
  });

  test('should change page when pagination controls are used', async () => {
    renderComponentWithProviders(<JournalDataTable columns={journalColumns} data={mockData} />);

    expect(
      screen.queryByText(formatDateTime(mockData[2].createdAt).dateTime)
    ).not.toBeInTheDocument();

    const nextPageButton = screen.getByTestId(/next button/);
    await userEvent.click(nextPageButton);

    expect(
      screen.queryByText(formatDateTime(mockData[1].createdAt).dateTime)
    ).not.toBeInTheDocument();
    expect(screen.getByText(formatDateTime(mockData[2].createdAt).dateTime)).toBeInTheDocument();

    const prevPageButton = screen.getByTestId(/prev button/);
    await userEvent.click(prevPageButton);

    expect(
      screen.queryByText(formatDateTime(mockData[2].createdAt).dateTime)
    ).not.toBeInTheDocument();
    expect(screen.getByText(formatDateTime(mockData[1].createdAt).dateTime)).toBeInTheDocument();
  });

  test('should toggle column visibility', async () => {
    renderComponentWithProviders(<JournalDataTable columns={journalColumns} data={mockData} />);

    const visibilityButton = screen.getByRole('button', { name: /View/ });
    await userEvent.click(visibilityButton);

    const eventIdCheckbox = screen.getByRole('menuitemcheckbox', { name: /Id/ });
    await userEvent.click(eventIdCheckbox);

    const eventIdHeader = screen.queryByRole('columnheader', { name: 'Event ID' });
    expect(eventIdHeader).not.toBeInTheDocument();
  });
});
