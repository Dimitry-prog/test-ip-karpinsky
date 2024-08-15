import { describe, expect, test, vi } from 'vitest';
import { NodeType } from '@/pages/home/types';
import { useDialogsType } from '@/pages/home/hooks/use-dialogs-type.ts';
import { screen } from '@testing-library/react';
import TreeActionsDropdown from '@/pages/home/components/tree-actions-dropdown.tsx';
import { renderComponentWithProviders } from '@/shared/lib/tests.tsx';
import { userEvent } from '@testing-library/user-event';

vi.mock('@/pages/home/hooks/use-dialogs-type.ts');

const mockNode: NodeType = {
  id: 1,
  name: 'my',
  children: [],
};

describe('TreeActionsDropdown', () => {
  const mockToggleDialogType = vi.fn();

  (useDialogsType as vi.Mock).mockReturnValue({
    dialogsType: {
      create: false,
      edit: false,
      delete: false,
    },
    toggleDialog: mockToggleDialogType,
  });

  test('should render tree action dropdown', () => {
    renderComponentWithProviders(<TreeActionsDropdown node={mockNode} />, false);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should open create dialog when select', async () => {
    renderComponentWithProviders(<TreeActionsDropdown node={mockNode} />, false);

    const triggerButton = screen.getByRole('button');
    expect(triggerButton).toBeInTheDocument();

    await userEvent.click(triggerButton);
    await userEvent.click(screen.getByText(/Create/));

    expect(mockToggleDialogType).toHaveBeenCalledWith('create');
  });

  test('should open edit dialog when select', async () => {
    renderComponentWithProviders(<TreeActionsDropdown node={mockNode} />, false);

    const triggerButton = screen.getByRole('button');
    expect(triggerButton).toBeInTheDocument();

    await userEvent.click(triggerButton);
    await userEvent.click(screen.getByText(/Edit/));

    expect(mockToggleDialogType).toHaveBeenCalledWith('edit');
  });

  test('should open delete dialog when select', async () => {
    renderComponentWithProviders(<TreeActionsDropdown node={mockNode} />, false);

    const triggerButton = screen.getByRole('button');
    expect(triggerButton).toBeInTheDocument();

    await userEvent.click(triggerButton);
    await userEvent.click(screen.getByText(/Delete/));

    expect(mockToggleDialogType).toHaveBeenCalledWith('delete');
  });
});
