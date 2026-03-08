import { describe, it, expect, vi } from 'vitest';
import { SignInWithGitHubUseCase } from '../../../application/SignInWithGitHubUseCase';
import { InMemoryAuthPort } from '../../../application/ports/AuthPort';

describe('The SignInWithGitHubUseCase', () => {
  it('delegates sign in to the auth port', async () => {
    const authPort = InMemoryAuthPort.withoutSession();
    const signInSpy = vi.spyOn(authPort, 'signInWithGitHub');
    const useCase = new SignInWithGitHubUseCase(authPort);

    await useCase.execute();

    expect(signInSpy).toHaveBeenCalledOnce();
  });
});
