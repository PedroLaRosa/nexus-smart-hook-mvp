import { useState } from 'react';
import { Maybe } from '../../../shared/domain/Maybe';
import { ProcessAuthCallbackUseCase } from '../../application/ProcessAuthCallbackUseCase';
import { SessionDTO } from '../../application/SessionDTO';

interface AuthCallbackState {
  error: Maybe<Error>;
}

const initialState: AuthCallbackState = {
  error: Maybe.none(),
};

export function useAuthCallback(useCase: ProcessAuthCallbackUseCase) {
  const [state, setState] = useState<AuthCallbackState>(initialState);

  const setError = (error: Error) => {
    setState((prev) => ({ ...prev, error: Maybe.some(error) }));
  };

  const processCallback = async (): Promise<SessionDTO | undefined> => {
    try {
      const session = await useCase.execute();
      return session;
    } catch (err) {
      setError(err as Error);
      return undefined;
    }
  };

  return {
    error: state.error,
    processCallback,
  };
}
