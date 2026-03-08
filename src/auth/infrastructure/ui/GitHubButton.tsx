import { useTranslation } from 'react-i18next';
import styles from './GitHubButton.module.css';
import { Factory } from '../../../shared/infrastructure/factory';
import { SignInWithGitHubUseCase } from '../../application/SignInWithGitHubUseCase';

interface Props {
  useCase: SignInWithGitHubUseCase;
}

export function GitHubButtonContainer() {
  return <GitHubButton useCase={Factory.createSignInWithGitHubUseCase()} />;
}

export function GitHubButton(props: Props) {
  const { t } = useTranslation('auth');

  const handleClick = async () => {
    await props.useCase.execute();
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {t('github-button.continue_with_github')}
    </button>
  );
}
