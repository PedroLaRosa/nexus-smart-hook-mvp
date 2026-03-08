import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SmartHookFromScript.module.css';
import { useSmartHookFromScript } from './SmartHookFromScript.hook';
import { GenerateSmartHookFromScriptUseCase } from '../../application/GenerateSmartHookFromScriptUseCase';
import { Factory } from '../../../shared/infrastructure/factory';

interface Props {
  useCase: GenerateSmartHookFromScriptUseCase;
}

export function SmartHookFromScriptContainer() {
  return <SmartHookFromScript useCase={Factory.createGenerateSmartHookFromScriptUseCase()} />;
}

export function SmartHookFromScript(props: Props) {
  const hook = useSmartHookFromScript(props.useCase);
  const { t } = useTranslation('smart_hook');

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('smart-hook-from-script.title')}</h2>
      <p className={styles.description}>{t('smart-hook-from-script.description')}</p>

      <div className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder={t('smart-hook-from-script.script_placeholder')}
          value={hook.scriptText}
          onChange={(e) => hook.setScriptText(e.target.value)}
          disabled={hook.loading}
          rows={10}
        />
        <button
          className={styles.button}
          onClick={hook.generateHook}
          disabled={hook.loading || hook.scriptText.trim() === ''}
        >
          {hook.loading ? t('smart-hook-from-script.button_analyzing') : t('smart-hook-from-script.button_generate')}
        </button>
      </div>

      {hook.error.isSome() && (
        <div className={styles.error}>
          {t('smart-hook-from-script.error', { message: hook.error.getOrThrow().message })}
        </div>
      )}

      {hook.hookResult.fold(
        () => null,
        (result) => (
          <div className={styles.result}>
            <p className={styles.resultLabel}>{t('smart-hook-from-script.result_label')}</p>
            <blockquote className={styles.hookText}>{result.hookText}</blockquote>
          </div>
        )
      )}
    </div>
  );
}
