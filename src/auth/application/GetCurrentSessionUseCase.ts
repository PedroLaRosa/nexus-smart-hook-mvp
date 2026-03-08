import { AuthPort } from './ports/AuthPort';
import { SessionDTO } from './SessionDTO';

export class GetCurrentSessionUseCase {
  constructor(private authPort: AuthPort) {}

  async execute(): Promise<SessionDTO | undefined> {
    return this.authPort.getSession();
  }
}
