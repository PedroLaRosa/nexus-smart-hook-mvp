import { useEffect } from 'react';
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

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Smart Hook from Video</h2>
      <p className={styles.description}>
        Pega la URL de un video y la IA generará el hook perfecto para los primeros 3 segundos.
      </p>

      <div className={styles.form}>
        <input
          className={styles.input}
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={hook.videoUrl}
          onChange={(e) => hook.setVideoUrl(e.target.value)}
          disabled={hook.loading}
        />
        <button
          className={styles.button}
          onClick={hook.generateHook}
          disabled={hook.loading || hook.videoUrl.trim() === ''}
        >
          {hook.loading ? 'Analizando...' : 'Generar hook'}
        </button>
      </div>

      {hook.error.isSome() && <div className={styles.error}>Error: {hook.error.getOrThrow().message}</div>}

      {hook.hookResult.fold(
        () => null,
        (result) => (
          <div className={styles.result}>
            <p className={styles.resultLabel}>Hook para los primeros 3 segundos:</p>
            <blockquote className={styles.hookText}>{result.hookText}</blockquote>
          </div>
        )
      )}
    </div>
  );
}
