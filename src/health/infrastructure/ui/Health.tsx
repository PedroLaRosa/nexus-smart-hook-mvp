import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHealth } from './Health.hook';
import { HealthUseCase } from '../../application/HealthUseCase';
import { HealthDTO } from '../../application/HealthDTO';
import { Factory } from '../../../shared/infrastructure/factory';
import styles from './Health.module.css';

export function HealthContainer() {
  const useCase = Factory.createHealthUseCase();
  return <Health useCase={useCase} />;
}

export function Health(props: { useCase: HealthUseCase }) {
  const hook = useHealth(props.useCase);

  useEffect(() => {
    hook.loadHealthStatus();
  }, []);

  if (hook.error.isSome()) {
    return (
      <ErrorMessage message={hook.error.getOrThrow().message} onRetry={hook.loadHealthStatus} loading={hook.loading} />
    );
  }
  if (hook.loading) {
    return <Loading />;
  }
  return hook.health.fold(
    () => <Empty />,
    (health) => <Details health={health} onRefresh={hook.loadHealthStatus} loading={hook.loading} />
  );
}

function ErrorMessage(props: { message: string; onRetry: () => void; loading: boolean }) {
  const { t } = useTranslation('health');
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <span className={styles.errorTitle}>{t('health.error_title')}</span>
        <span className={styles.errorMessage}>{props.message}</span>
      </div>
      <button className={styles.refreshButton} onClick={props.onRetry} disabled={props.loading}>
        {t('health.retry')}
      </button>
    </div>
  );
}

function Loading() {
  const { t } = useTranslation('health');
  return (
    <div className={styles.container}>
      <div className={styles.loading}>{t('health.loading')}</div>
    </div>
  );
}

function Empty() {
  const { t } = useTranslation('health');
  return (
    <div className={styles.container}>
      <div className={styles.empty}>{t('health.empty')}</div>
    </div>
  );
}

function Details(props: { health: HealthDTO; onRefresh: () => void; loading: boolean }) {
  const { t } = useTranslation('health');
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('health.title')}</h1>
        <p className={styles.subtitle}>{t('health.subtitle')}</p>
      </div>
      <div className={styles.statusCard}>
        <StatusRow
          label={t('health.status_label')}
          value={<span className={styles.healthy}>● {props.health.status}</span>}
        />
        <StatusRow label={t('health.uptime_label')} value={props.health.formattedUptime} />
        <StatusRow label={t('health.started_label')} value={props.health.formattedCreatedAt} />
        <StatusRow label={t('health.last_check_label')} value={props.health.formattedLastCheckedAt} />
      </div>
      <button className={styles.refreshButton} onClick={props.onRefresh} disabled={props.loading}>
        {t('health.refresh')}
      </button>
    </div>
  );
}

function StatusRow(props: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.statusRow}>
      <span className={styles.label}>{props.label}</span>
      <span className={styles.value}>{props.value}</span>
    </div>
  );
}
