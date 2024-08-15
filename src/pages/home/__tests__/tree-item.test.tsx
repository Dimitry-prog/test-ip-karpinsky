import { describe, expect, test } from 'vitest';
import { NodeType } from '@/pages/home/types';
import { renderComponentWithProviders } from '@/shared/lib/tests.tsx';
import { screen } from '@testing-library/react';
import TreeItem from '@/pages/home/components/tree-item.tsx';
import { userEvent } from '@testing-library/user-event';

const mockNode: NodeType = {
  id: 1,
  name: 'my',
  children: [
    {
      id: 2,
      name: 'test',
      children: [],
    },
  ],
};

describe('TreeItem', () => {
  test('should render tree item', () => {
    renderComponentWithProviders(<TreeItem node={mockNode} />, false);

    expect(screen.getByText('my')).toBeInTheDocument();
  });

  test('should toggles children visibility', async () => {
    renderComponentWithProviders(<TreeItem node={mockNode} />, false);

    const button = screen.getByTestId('root button');

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.getByText(/test/)).toBeInTheDocument();

    const childrenList = screen.getAllByRole('listitem');
    expect(childrenList.length).toBe(2);

    await userEvent.click(button);
    expect(screen.queryByText(/test/)).not.toBeInTheDocument();
  });

  test('should render correct number of children', async () => {
    renderComponentWithProviders(<TreeItem node={mockNode} />, false);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    const button = screen.getByTestId('root button');

    await userEvent.click(button);
    const childrenList = screen.getAllByRole('listitem');

    expect(childrenList.length).toBe(2);
  });
});
