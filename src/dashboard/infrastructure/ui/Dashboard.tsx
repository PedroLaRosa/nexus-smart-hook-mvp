import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { Factory } from '../../../shared/infrastructure/factory';
import { GetCurrentSessionUseCase } from '../../../auth/application/GetCurrentSessionUseCase';
import { useDashboard } from './Dashboard.hook';
import { Routes } from '../../../shared/infrastructure/ui/routes';

interface Props {
  useCase: GetCurrentSessionUseCase;
}

export function DashboardContainer() {
  return <Dashboard useCase={Factory.createGetCurrentSessionUseCase()} />;
}

export function Dashboard(props: Props) {
  const hook = useDashboard(props.useCase);
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
      <h1>Dashboard</h1>
    </div>
  );
}
