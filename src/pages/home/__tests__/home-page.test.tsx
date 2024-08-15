import { describe, expect, test, vi } from 'vitest';
import { TreeType } from '@/pages/home/types';
import { screen } from '@testing-library/react';
import HomePage from '@/pages/home';
import { useTree } from '@/pages/home/hooks/use-tree.ts';
import { useDialogsType } from '@/pages/home/hooks/use-dialogs-type.ts';
import { renderComponentWithProviders } from '@/shared/lib/tests.tsx';
import { userEvent } from '@testing-library/user-event';

vi.mock('@/pages/home/hooks/use-tree.ts');
vi.mock('@/pages/home/hooks/use-dialogs-type.ts');

type UseTreeReturnType = {
  data: TreeType | null;
  isLoading: boolean;
  isError: boolean;
  error?: { message: string };
};

describe('HomePage', () => {
  const mockUseTree = useTree as vi.Mock<UseTreeReturnType>;
  const mockToggleDialogType = vi.fn();

  (useDialogsType as vi.Mock).mockReturnValue({
    dialogsType: {
      create: false,
      edit: false,
      delete: false,
    },
    toggleDialog: mockToggleDialogType,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render loading', () => {
    mockUseTree.mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    renderComponentWithProviders(<HomePage />, false);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should render error', () => {
    mockUseTree.mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
      error: { message: 'Failed to fetch' },
    });

    renderComponentWithProviders(<HomePage />, false);

    expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument();
  });

  test('should render tree, toggle-button and create-button', () => {
    mockUseTree.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        name: 'my',
        children: [],
      },
    });

    renderComponentWithProviders(<HomePage />, false);

    expect(screen.getByText(/my/)).toBeInTheDocument();
    expect(screen.getByTestId('toggle-button')).toBeInTheDocument();
    expect(screen.getByTestId('create-button')).toBeInTheDocument();
  });

  test('should toggle dialog when create-button is clicked', async () => {
    mockUseTree.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        name: 'my',
        children: [],
      },
    });

    renderComponentWithProviders(<HomePage />, false);

    const createButton = screen.getByTestId('create-button');
    await userEvent.click(createButton);

    expect(mockToggleDialogType).toHaveBeenCalledWith('create');
  });

  test('should toggle visibility children', async () => {
    mockUseTree.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        name: 'my',
        children: [
          {
            id: 2,
            name: 'test',
            children: [],
          },
        ],
      },
    });

    renderComponentWithProviders(<HomePage />, false);

    const toggleButton = screen.getByTestId('toggle-button');
    await userEvent.click(toggleButton);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    await userEvent.click(toggleButton);
    expect(list).not.toBeInTheDocument();
  });
});
