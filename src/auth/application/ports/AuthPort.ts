import { SessionDTO } from '../SessionDTO';

export interface AuthPort {
  signInWithGitHub(): Promise<void>;
  getSession(): Promise<SessionDTO | undefined>;
}

export class InMemoryAuthPort implements AuthPort {
  private constructor(private session: SessionDTO | undefined) {}

  static withSession(session: SessionDTO): InMemoryAuthPort {
    return new InMemoryAuthPort(session);
  }

  static withoutSession(): InMemoryAuthPort {
    return new InMemoryAuthPort(undefined);
  }

  async signInWithGitHub(): Promise<void> {}

  async getSession(): Promise<SessionDTO | undefined> {
    return this.session;
  }
}
