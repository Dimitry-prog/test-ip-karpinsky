import { describe, expect, test } from 'vitest';
import { renderComponentWithProviders } from '@/shared/lib/tests.tsx';
import { screen } from '@testing-library/react';
import { NodeType } from '@/pages/home/types';
import TreeList from '@/pages/home/components/tree-list.tsx';

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

describe('TreeList', () => {
  test('should render tree list', () => {
    renderComponentWithProviders(<TreeList tree={mockNode} />, false);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText(/test/)).toBeInTheDocument();
  });
});
