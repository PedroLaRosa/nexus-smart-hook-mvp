import { AuthPort } from './ports/AuthPort';

export class SignOutUseCase {
  constructor(private authPort: AuthPort) {}

  async execute(): Promise<void> {
    await this.authPort.signOut();
  }
}
