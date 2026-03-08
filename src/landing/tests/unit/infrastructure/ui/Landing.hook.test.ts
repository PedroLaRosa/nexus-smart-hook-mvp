import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLanding } from '../../../../infrastructure/ui/Landing.hook';
import { InMemoryAuthPort } from '../../../../../auth/application/ports/AuthPort';
import { GetCurrentSessionUseCase } from '../../../../../auth/application/GetCurrentSessionUseCase';

const testSession = {
  userId: 'user-1',
  email: 'user@example.com',
  accessToken: 'token-123',
  avatarUrl: 'https://example.com/avatar.png',
  name: 'Test User',
};

describe('The useLanding hook', () => {
  it('starts in loading state', () => {
    const authPort = InMemoryAuthPort.withoutSession();
    const useCase = new GetCurrentSessionUseCase(authPort);

    const { result } = renderHook(() => useLanding(useCase));

    expect(result.current.loading).toBe(true);
    expect(result.current.session.isNone()).toBe(true);
  });

  it('sets no session when the user is not authenticated', async () => {
    const authPort = InMemoryAuthPort.withoutSession();
    const useCase = new GetCurrentSessionUseCase(authPort);
    const { result } = renderHook(() => useLanding(useCase));

    await act(async () => {
      await result.current.checkSession();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.session.isNone()).toBe(true);
  });

  it('sets the session when the user is authenticated', async () => {
    const authPort = InMemoryAuthPort.withSession(testSession);
    const useCase = new GetCurrentSessionUseCase(authPort);
    const { result } = renderHook(() => useLanding(useCase));

    await act(async () => {
      await result.current.checkSession();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.session.isSome()).toBe(true);
    expect(result.current.session.getOrThrow().email).toBe(testSession.email);
  });
});
