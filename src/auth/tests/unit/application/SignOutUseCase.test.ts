import { describe, it, expect, vi } from 'vitest';
import { SignOutUseCase } from '../../../application/SignOutUseCase';
import { InMemoryAuthPort } from '../../../application/ports/AuthPort';

describe('The SignOutUseCase', () => {
  it('delegates sign-out to the auth port', async () => {
    const authPort = InMemoryAuthPort.withoutSession();
    const signOutSpy = vi.spyOn(authPort, 'signOut');
    const useCase = new SignOutUseCase(authPort);

    await useCase.execute();

    expect(signOutSpy).toHaveBeenCalledOnce();
  });
});
