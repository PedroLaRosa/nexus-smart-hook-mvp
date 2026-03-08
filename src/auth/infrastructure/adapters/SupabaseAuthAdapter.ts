import { SupabaseClient } from '@supabase/supabase-js';
import { AuthPort } from '../../application/ports/AuthPort';
import { SessionDTO } from '../../application/SessionDTO';

export class SupabaseAuthAdapter implements AuthPort {
  constructor(private supabase: SupabaseClient) {}

  async signInWithGitHub(): Promise<void> {
    await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async getSession(): Promise<SessionDTO | undefined> {
    const { data } = await this.supabase.auth.getSession();
    if (!data.session) return undefined;
    const metadata = data.session.user.user_metadata ?? {};
    return {
      userId: data.session.user.id,
      email: data.session.user.email ?? '',
      accessToken: data.session.access_token,
      avatarUrl: metadata.avatar_url ?? '',
      name: metadata.full_name ?? metadata.user_name ?? '',
    };
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}
