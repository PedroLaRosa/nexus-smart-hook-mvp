import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserMenu } from '../../../../infrastructure/ui/UserMenu.hook';
import { InMemoryAuthPort } from '../../../../application/ports/AuthPort';
import { SignOutUseCase } from '../../../../application/SignOutUseCase';

function buildUseCase() {
  const authPort = InMemoryAuthPort.withoutSession();
  return new SignOutUseCase(authPort);
}

describe('The useUserMenu hook', () => {
  it('starts with the dropdown closed', () => {
    const { result } = renderHook(() => useUserMenu(buildUseCase(), vi.fn()));

    expect(result.current.isOpen).toBe(false);
  });

  it('opens the dropdown when toggled', () => {
    const { result } = renderHook(() => useUserMenu(buildUseCase(), vi.fn()));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('closes the dropdown when toggled twice', () => {
    const { result } = renderHook(() => useUserMenu(buildUseCase(), vi.fn()));

    act(() => {
      result.current.toggle();
    });
    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('closes the dropdown explicitly', () => {
    const { result } = renderHook(() => useUserMenu(buildUseCase(), vi.fn()));

    act(() => {
      result.current.toggle();
    });
    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('closes the dropdown and calls onSignOut after sign-out', async () => {
    const onSignOut = vi.fn();
    const { result } = renderHook(() => useUserMenu(buildUseCase(), onSignOut));

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.isOpen).toBe(false);
    expect(onSignOut).toHaveBeenCalledOnce();
  });
});
