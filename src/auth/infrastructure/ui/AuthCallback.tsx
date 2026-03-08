import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AuthCallback.module.css';
import { Factory } from '../../../shared/infrastructure/factory';
import { ProcessAuthCallbackUseCase } from '../../application/ProcessAuthCallbackUseCase';
import { useAuthCallback } from './AuthCallback.hook';
import { Routes } from '../../../shared/infrastructure/ui/routes';

interface Props {
  useCase: ProcessAuthCallbackUseCase;
}

export function AuthCallbackContainer() {
  return <AuthCallback useCase={Factory.createProcessAuthCallbackUseCase()} />;
}

export function AuthCallback(props: Props) {
  const hook = useAuthCallback(props.useCase);
  const navigate = useNavigate();
  const { t } = useTranslation('auth');

  useEffect(() => {
    hook.processCallback().then((session) => {
      if (session) {
        navigate(Routes.Dashboard, { replace: true });
      }
    });
  }, []);

  return hook.error.fold(
    () => <div className={styles.container}>{t('auth-callback.processing')}</div>,
    (error) => <div className={styles.error}>{t('auth-callback.error', { message: error.message })}</div>
  );
}
