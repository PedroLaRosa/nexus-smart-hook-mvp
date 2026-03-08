import { useState } from 'react';
import { Maybe } from '../../../shared/domain/Maybe';
import { GetCurrentSessionUseCase } from '../../../auth/application/GetCurrentSessionUseCase';
import { SessionDTO } from '../../../auth/application/SessionDTO';

interface LandingState {
  session: Maybe<SessionDTO>;
  loading: boolean;
}

const initialState: LandingState = {
  session: Maybe.none(),
  loading: true,
};

export function useLanding(useCase: GetCurrentSessionUseCase) {
  const [state, setState] = useState<LandingState>(initialState);

  const setSession = (session: SessionDTO) => {
    setState((prev) => ({ ...prev, session: Maybe.some(session), loading: false }));
  };

  const setNoSession = () => {
    setState((prev) => ({ ...prev, session: Maybe.none(), loading: false }));
  };

  const checkSession = async () => {
    const session = await useCase.execute();
    if (session) {
      setSession(session);
    } else {
      setNoSession();
    }
  };

  const clearSession = () => {
    setState((prev) => ({ ...prev, session: Maybe.none(), loading: false }));
  };

  return {
    session: state.session,
    loading: state.loading,
    checkSession,
    clearSession,
  };
}
