import { useUserMenu } from './UserMenu.hook';
import { SessionDTO } from '../../application/SessionDTO';
import { SignOutUseCase } from '../../application/SignOutUseCase';
import styles from './UserMenu.module.css';

interface Props {
  session: SessionDTO;
  signOutUseCase: SignOutUseCase;
  onSignOut: () => void;
}

export function UserMenu(props: Props) {
  const hook = useUserMenu(props.signOutUseCase, props.onSignOut);

  return (
    <div className={styles.container}>
      <button className={styles.avatar} onClick={hook.toggle} aria-label="User menu">
        {props.session.avatarUrl ? (
          <img
            src={props.session.avatarUrl}
            alt={props.session.name}
            className={styles.avatarImage}
          />
        ) : (
          <span className={styles.avatarFallback}>
            {props.session.email[0].toUpperCase()}
          </span>
        )}
      </button>
      {hook.isOpen && (
        <div className={styles.dropdown}>
          <span className={styles.userName}>
            {props.session.name || props.session.email}
          </span>
          <button className={styles.signOutButton} onClick={hook.signOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
