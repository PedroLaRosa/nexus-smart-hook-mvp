import { AuthPort } from './ports/AuthPort';
import { SessionDTO } from './SessionDTO';
import { DomainError } from '../../shared/domain/DomainError';

export class ProcessAuthCallbackUseCase {
  constructor(private authPort: AuthPort) {}

  async execute(): Promise<SessionDTO> {
    const session = await this.authPort.getSession();
    if (!session) {
      throw DomainError.createNotFound('No active session found after authentication');
    }
    return session;
  }
}
