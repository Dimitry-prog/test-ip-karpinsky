import { describe, expect, test, vi } from 'vitest';
import { NodeType } from '@/pages/home/types';
import { renderComponentWithProviders } from '@/shared/lib/tests.tsx';
import TreeForm from '@/pages/home/components/tree-form.tsx';
import { useCreateNode } from '@/pages/home/hooks/use-create-node.ts';
import { useUpdatedNode } from '@/pages/home/hooks/use-updated-node.ts';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

vi.mock('@/pages/home/hooks/use-create-node.ts');
vi.mock('@/pages/home/hooks/use-updated-node.ts');

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

describe('TreeForm', () => {
  const mockCreateNode = vi.fn();
  const mockUpdatedNode = vi.fn();
  const mockOnOpenChange = vi.fn();
  const mockOnClose = vi.fn();

  (useCreateNode as vi.Mock).mockReturnValue({ mutate: mockCreateNode });
  (useUpdatedNode as vi.Mock).mockReturnValue({ mutate: mockUpdatedNode });

  test('should render create form correctly', async () => {
    renderComponentWithProviders(
      <TreeForm type="Create" onOpenChange={mockOnOpenChange} open={true} onClose={mockOnClose} />
    );

    expect(screen.getByText(/Create node/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Node name/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter node name/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Node/ })).toBeInTheDocument();
  });

  test('should render edit form correctly', async () => {
    renderComponentWithProviders(
      <TreeForm
        type="Edit"
        onOpenChange={mockOnOpenChange}
        open={true}
        onClose={mockOnClose}
        node={mockNode}
      />
    );

    expect(screen.getByText(/Edit node/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Node name/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter node name/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/my/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Edit Node/ })).toBeInTheDocument();
  });

  test('should call submit create function', async () => {
    renderComponentWithProviders(
      <TreeForm
        type="Create"
        onOpenChange={mockOnOpenChange}
        open={true}
        onClose={mockOnClose}
        node={mockNode}
      />
    );

    const input = screen.getByPlaceholderText(/Enter node name/);
    fireEvent.change(input, { target: { value: 'test' } });

    const createButton = screen.getByRole('button', { name: /Create Node/ });
    await userEvent.click(createButton);

    await waitFor(() => {
      expect(mockCreateNode).toHaveBeenCalledWith({
        treeName: 'my',
        parentNodeId: mockNode.id,
        nodeName: 'test',
      });
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should call submit edit function', async () => {
    renderComponentWithProviders(
      <TreeForm
        type="Edit"
        onOpenChange={mockOnOpenChange}
        open={true}
        onClose={mockOnClose}
        node={mockNode}
      />
    );

    const input = screen.getByPlaceholderText(/Enter node name/);
    fireEvent.change(input, { target: { value: 'edited' } });

    const editButton = screen.getByRole('button', { name: /Edit Node/ });
    await userEvent.click(editButton);

    await waitFor(() => {
      expect(mockUpdatedNode).toHaveBeenCalledWith({
        treeName: 'my',
        nodeId: mockNode.id,
        newNodeName: 'edited',
      });
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should show error message when input.length > 10', async () => {
    renderComponentWithProviders(
      <TreeForm
        type="Edit"
        onOpenChange={mockOnOpenChange}
        open={true}
        onClose={mockOnClose}
        node={mockNode}
      />
    );

    const input = screen.getByPlaceholderText(/Enter node name/);
    fireEvent.change(input, { target: { value: 'long input value more than ten' } });

    const editButton = screen.getByRole('button', { name: /Edit Node/ });
    await userEvent.click(editButton);

    expect(screen.getByText(/Max character is ten/)).toBeInTheDocument();
  });

  test('should not show error message when input.length < 10', async () => {
    renderComponentWithProviders(
      <TreeForm
        type="Edit"
        onOpenChange={mockOnOpenChange}
        open={true}
        onClose={mockOnClose}
        node={mockNode}
      />
    );

    const input = screen.getByPlaceholderText(/Enter node name/);
    fireEvent.change(input, { target: { value: 'less ten' } });

    const editButton = screen.getByRole('button', { name: /Edit Node/ });
    await userEvent.click(editButton);

    expect(screen.queryByText(/Max character is ten/)).not.toBeInTheDocument();
  });
});
