import { useState } from 'react';
import { SignOutUseCase } from '../../application/SignOutUseCase';

interface UserMenuState {
  isOpen: boolean;
}

const initialState: UserMenuState = {
  isOpen: false,
};

export function useUserMenu(useCase: SignOutUseCase, onSignOut: () => void) {
  const [state, setState] = useState<UserMenuState>(initialState);

  const toggle = () => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const close = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  const signOut = async () => {
    await useCase.execute();
    setState((prev) => ({ ...prev, isOpen: false }));
    onSignOut();
  };

  return {
    isOpen: state.isOpen,
    toggle,
    close,
    signOut,
  };
}
