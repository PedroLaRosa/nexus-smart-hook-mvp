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
  const handleClick = async () => {
    await props.useCase.execute();
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Continuar con GitHub
    </button>
  );
}
