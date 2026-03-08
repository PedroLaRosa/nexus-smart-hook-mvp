import { HealthRepository, InMemoryHealthRepository } from '../../health/domain/repositories/HealthRepository';
import { HealthUseCase } from '../../health/application/HealthUseCase';
import { Health } from '../../health/domain/entities/Health';
import { Id } from '../domain/value-objects/Id';
import { AuthPort, InMemoryAuthPort } from '../../auth/application/ports/AuthPort';
import { SignInWithGitHubUseCase } from '../../auth/application/SignInWithGitHubUseCase';
import { GetCurrentSessionUseCase } from '../../auth/application/GetCurrentSessionUseCase';
import { ProcessAuthCallbackUseCase } from '../../auth/application/ProcessAuthCallbackUseCase';
import { SignOutUseCase } from '../../auth/application/SignOutUseCase';

export class Factory {
  private static healthRepository?: HealthRepository;
  private static authPort?: AuthPort;

  static getHealthRepository(): HealthRepository {
    if (!this.healthRepository) {
      const now = new Date();
      const initialHealth = Health.create(Id.generate(), now, now);
      this.healthRepository = InMemoryHealthRepository.withHealth(initialHealth);
    }
    return this.healthRepository;
  }

  static createHealthUseCase(): HealthUseCase {
    return new HealthUseCase(this.getHealthRepository());
  }

  static getAuthAdapter(): AuthPort {
    if (!this.authPort) {
      this.authPort = InMemoryAuthPort.withoutSession();
    }
    return this.authPort;
  }

  static createSignInWithGitHubUseCase(): SignInWithGitHubUseCase {
    return new SignInWithGitHubUseCase(this.getAuthAdapter());
  }

  static createGetCurrentSessionUseCase(): GetCurrentSessionUseCase {
    return new GetCurrentSessionUseCase(this.getAuthAdapter());
  }

  static createProcessAuthCallbackUseCase(): ProcessAuthCallbackUseCase {
    return new ProcessAuthCallbackUseCase(this.getAuthAdapter());
  }

  static createSignOutUseCase(): SignOutUseCase {
    return new SignOutUseCase(this.getAuthAdapter());
  }
}
