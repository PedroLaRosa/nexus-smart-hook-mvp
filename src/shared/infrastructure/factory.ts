import { SupabaseClient } from '@supabase/supabase-js';
import { HttpClient } from './http/HttpClient';
import { HealthRepository } from '../../health/domain/repositories/HealthRepository';
import { HttpHealthRepository } from '../../health/infrastructure/adapters/HttpHealthRepository';
import { HealthUseCase } from '../../health/application/HealthUseCase';
import { createSupabaseClient } from './supabase/SupabaseClient';
import { AuthPort } from '../../auth/application/ports/AuthPort';
import { SupabaseAuthAdapter } from '../../auth/infrastructure/adapters/SupabaseAuthAdapter';
import { SignInWithGitHubUseCase } from '../../auth/application/SignInWithGitHubUseCase';
import { GetCurrentSessionUseCase } from '../../auth/application/GetCurrentSessionUseCase';
import { ProcessAuthCallbackUseCase } from '../../auth/application/ProcessAuthCallbackUseCase';

export class Factory {
  private static readonly apiBaseUrl = import.meta.env.VITE_API_URL || '/api';
  private static httpClient: HttpClient | null = null;
  private static healthRepository: HealthRepository | null = null;
  private static supabaseInstance: SupabaseClient | null = null;
  private static authAdapter: AuthPort | null = null;

  static getHttpClient(): HttpClient {
    if (!this.httpClient) {
      this.httpClient = new HttpClient(this.apiBaseUrl);
    }
    return this.httpClient;
  }

  static getHealthRepository(): HealthRepository {
    if (!this.healthRepository) {
      this.healthRepository = new HttpHealthRepository(this.getHttpClient());
    }
    return this.healthRepository;
  }

  static createHealthUseCase(): HealthUseCase {
    return new HealthUseCase(this.getHealthRepository());
  }

  static getSupabaseClient(): SupabaseClient {
    if (!this.supabaseInstance) {
      this.supabaseInstance = createSupabaseClient();
    }
    return this.supabaseInstance;
  }

  static getAuthAdapter(): AuthPort {
    if (!this.authAdapter) {
      this.authAdapter = new SupabaseAuthAdapter(this.getSupabaseClient());
    }
    return this.authAdapter;
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
}
