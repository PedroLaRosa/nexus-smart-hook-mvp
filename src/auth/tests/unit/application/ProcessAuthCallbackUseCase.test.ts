import { describe, it, expect } from 'vitest';
import { ProcessAuthCallbackUseCase } from '../../../application/ProcessAuthCallbackUseCase';
import { InMemoryAuthPort } from '../../../application/ports/AuthPort';

describe('The ProcessAuthCallbackUseCase', () => {
  it('returns the session when authentication succeeded', async () => {
    const existingSession = { userId: 'user-1', email: 'user@example.com', accessToken: 'token-123' };
    const authPort = InMemoryAuthPort.withSession(existingSession);
    const useCase = new ProcessAuthCallbackUseCase(authPort);

    const session = await useCase.execute();

    expect(session).toEqual(existingSession);
  });

  it('throws a domain error when there is no session after callback', async () => {
    const authPort = InMemoryAuthPort.withoutSession();
    const useCase = new ProcessAuthCallbackUseCase(authPort);

    await expect(useCase.execute()).rejects.toMatchObject({
      type: 'notFound',
    });
  });
});
