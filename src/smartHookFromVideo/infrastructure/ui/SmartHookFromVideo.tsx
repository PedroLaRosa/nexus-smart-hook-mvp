import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SmartHookFromVideo.module.css';
import { useSmartHookFromVideo } from './SmartHookFromVideo.hook';
import { GenerateSmartHookUseCase } from '../../application/GenerateSmartHookUseCase';
import { Factory } from '../../../shared/infrastructure/factory';

interface Props {
  useCase: GenerateSmartHookUseCase;
}

export function SmartHookFromVideoContainer() {
  return <SmartHookFromVideo useCase={Factory.createGenerateSmartHookUseCase()} />;
}

export function SmartHookFromVideo(props: Props) {
  const hook = useSmartHookFromVideo(props.useCase);
  const { t } = useTranslation('smart_hook');

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('smart-hook-from-video.title')}</h2>
      <p className={styles.description}>{t('smart-hook-from-video.description')}</p>

      <div className={styles.form}>
        <input
          className={styles.input}
          type="url"
          placeholder={t('smart-hook-from-video.url_placeholder')}
          value={hook.videoUrl}
          onChange={(e) => hook.setVideoUrl(e.target.value)}
          disabled={hook.loading}
        />
        <button
          className={styles.button}
          onClick={hook.generateHook}
          disabled={hook.loading || hook.videoUrl.trim() === ''}
        >
          {hook.loading ? t('smart-hook-from-video.button_analyzing') : t('smart-hook-from-video.button_generate')}
        </button>
      </div>

      {hook.error.isSome() && (
        <div className={styles.error}>
          {t('smart-hook-from-video.error', { message: hook.error.getOrThrow().message })}
        </div>
      )}

      {hook.hookResult.fold(
        () => null,
        (result) => (
          <div className={styles.result}>
            <p className={styles.resultLabel}>{t('smart-hook-from-video.result_label')}</p>
            <blockquote className={styles.hookText}>{result.hookText}</blockquote>
          </div>
        )
      )}
    </div>
  );
}
