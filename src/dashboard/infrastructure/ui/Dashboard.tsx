import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <h1 className={styles.title}>Dashboard</h1>
        <UserMenu
          session={hook.session.getOrThrow()}
          signOutUseCase={props.signOutUseCase}
          onSignOut={() => navigate(Routes.Home, { replace: true })}
        />
      </header>
    </div>
  );
}
