import { describe, it, expect } from 'vitest';
import { GetCurrentSessionUseCase } from '../../../application/GetCurrentSessionUseCase';
import { InMemoryAuthPort } from '../../../application/ports/AuthPort';

describe('The GetCurrentSessionUseCase', () => {
  it('returns undefined when there is no active session', async () => {
    const authPort = InMemoryAuthPort.withoutSession();
    const useCase = new GetCurrentSessionUseCase(authPort);

    const session = await useCase.execute();

    expect(session).toBeUndefined();
  });

  it('returns the current session when the user is authenticated', async () => {
    const existingSession = { userId: 'user-1', email: 'user@example.com', accessToken: 'token-123' };
    const authPort = InMemoryAuthPort.withSession(existingSession);
    const useCase = new GetCurrentSessionUseCase(authPort);

    const session = await useCase.execute();

    expect(session).toEqual(existingSession);
  });
});
