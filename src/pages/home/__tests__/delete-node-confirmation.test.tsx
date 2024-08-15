import { describe, expect, test, vi } from 'vitest';
import { NodeType } from '@/pages/home/types';
import { useDeleteNode } from '@/pages/home/hooks/use-delete-node.ts';
import { renderComponentWithProviders } from '@/shared/lib/tests.tsx';
import DeleteNodeConfirmation from '@/pages/home/components/delete-node-confirmation.tsx';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

vi.mock('@/pages/home/hooks/use-delete-node.ts');

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

describe('DeleteNodeConfirmation', () => {
  const mockOnOpenChange = vi.fn();
  const mockDeleteNode = vi.fn();

  (useDeleteNode as vi.Mock).mockReturnValue({
    mutate: mockDeleteNode,
  });

  test('should render correctly', async () => {
    renderComponentWithProviders(
      <DeleteNodeConfirmation node={mockNode} onOpenChange={mockOnOpenChange} open={true} />
    );

    expect(screen.getByText(/Are you sure you want to delete?/)).toBeInTheDocument();
    expect(screen.getByText(/This will permanently delete this node/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  test('should call delete function when Delete button is clicked', async () => {
    renderComponentWithProviders(
      <DeleteNodeConfirmation node={mockNode} onOpenChange={mockOnOpenChange} open={true} />
    );

    const deleteButton = screen.getByRole('button', { name: /Delete/i });

    await userEvent.click(deleteButton);

    expect(mockDeleteNode).toHaveBeenCalledWith({
      treeName: 'my',
      nodeId: mockNode.id,
    });
  });

  test('should call onOpenChange when dialog is closed', async () => {
    renderComponentWithProviders(
      <DeleteNodeConfirmation node={mockNode} onOpenChange={mockOnOpenChange} open={true} />
    );

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });

    await userEvent.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalled();
  });
});
