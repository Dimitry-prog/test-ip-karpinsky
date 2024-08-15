import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useDialogsType } from '@/pages/home/hooks/use-dialogs-type.ts';

describe('useDialogsType hook', () => {
  test('should toggle dialog state', () => {
    const { result } = renderHook(() => useDialogsType());

    expect(result.current.dialogsType.create).toBe(false);

    act(() => {
      result.current.toggleDialog('create');
    });
    expect(result.current.dialogsType.create).toBe(true);

    act(() => {
      result.current.toggleDialog('create');
    });
    expect(result.current.dialogsType.create).toBe(false);
  });
});
