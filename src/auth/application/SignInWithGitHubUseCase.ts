import { AuthPort } from './ports/AuthPort';

export class SignInWithGitHubUseCase {
  constructor(private authPort: AuthPort) {}

  async execute(): Promise<void> {
    await this.authPort.signInWithGitHub();
  }
}
