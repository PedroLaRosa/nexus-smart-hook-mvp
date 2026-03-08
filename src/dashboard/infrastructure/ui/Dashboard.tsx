import { useEffect } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Dashboard.module.css';
import { Factory } from '../../../shared/infrastructure/factory';
import { GetCurrentSessionUseCase } from '../../../auth/application/GetCurrentSessionUseCase';
import { SignOutUseCase } from '../../../auth/application/SignOutUseCase';
import { useDashboard } from './Dashboard.hook';
import { UserMenu } from '../../../auth/infrastructure/ui/UserMenu';
import { Routes } from '../../../shared/infrastructure/ui/routes';

interface Props {
  getSessionUseCase: GetCurrentSessionUseCase;
  signOutUseCase: SignOutUseCase;
}

export function DashboardContainer() {
  return (
    <Dashboard
      getSessionUseCase={Factory.createGetCurrentSessionUseCase()}
      signOutUseCase={Factory.createSignOutUseCase()}
    />
  );
}

export function Dashboard(props: Props) {
  const hook = useDashboard(props.getSessionUseCase);
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');

  useEffect(() => {
    hook.checkSession();
  }, []);

  useEffect(() => {
    if (!hook.loading && hook.session.isNone()) {
      navigate(Routes.Home, { replace: true });
    }
  }, [hook.loading, hook.session, navigate]);

  if (hook.loading) {
    return null;
  }

  if (hook.session.isNone()) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.logo}>{t('dashboard.logo')}</span>
        <UserMenu
          session={hook.session.getOrThrow()}
          signOutUseCase={props.signOutUseCase}
          onSignOut={() => navigate(Routes.Home, { replace: true })}
        />
      </header>
      <div className={styles.body}>
        <nav className={styles.sidebar}>
          <NavLink
            to={Routes.SmartHookFromVideo}
            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
          >
            {t('dashboard.nav.smart_hook_from_video')}
          </NavLink>
          <NavLink
            to={Routes.SmartHookFromScript}
            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
          >
            {t('dashboard.nav.smart_hook_from_script')}
          </NavLink>
        </nav>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
