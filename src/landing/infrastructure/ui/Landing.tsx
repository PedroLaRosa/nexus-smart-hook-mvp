import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import { useLanding } from './Landing.hook';
import { GitHubButtonContainer } from '../../../auth/infrastructure/ui/GitHubButton';
import { UserMenu } from '../../../auth/infrastructure/ui/UserMenu';
import { Factory } from '../../../shared/infrastructure/factory';
import { GetCurrentSessionUseCase } from '../../../auth/application/GetCurrentSessionUseCase';
import { SignOutUseCase } from '../../../auth/application/SignOutUseCase';
import { Routes } from '../../../shared/infrastructure/ui/routes';

interface Props {
  getSessionUseCase: GetCurrentSessionUseCase;
  signOutUseCase: SignOutUseCase;
}

export function LandingContainer() {
  return (
    <Landing
      getSessionUseCase={Factory.createGetCurrentSessionUseCase()}
      signOutUseCase={Factory.createSignOutUseCase()}
    />
  );
}

export function Landing(props: Props) {
  const hook = useLanding(props.getSessionUseCase);

  useEffect(() => {
    hook.checkSession();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Nexus</h1>
        {hook.loading ? null : hook.session.fold(
          () => <GitHubButtonContainer />,
          (session) => (
            <nav className={styles.nav}>
              <Link to={Routes.Dashboard} className={styles.navLink}>dashboard</Link>
              <UserMenu session={session} signOutUseCase={props.signOutUseCase} onSignOut={hook.clearSession} />
            </nav>
          ),
        )}
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2 className={styles.headline}>
            <b>Extrae el hook perfecto de 3 segundos</b> de cualquier video
          </h2>
          <p className={styles.description}>
            Analiza videos de <b>YouTube</b>, <b>Twitch</b> y almacenamiento en la nube. Nexus identifica y genera el
            momento de mayor impacto para captar la atención de tu audiencia desde el primer instante.
          </p>
        </section>
      </main>
    </div>
  );
}
