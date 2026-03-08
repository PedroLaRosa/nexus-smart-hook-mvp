import { useState } from 'react';
import { Maybe } from '../../../shared/domain/Maybe';
import { GetCurrentSessionUseCase } from '../../../auth/application/GetCurrentSessionUseCase';
import { SessionDTO } from '../../../auth/application/SessionDTO';

interface DashboardState {
  session: Maybe<SessionDTO>;
  loading: boolean;
}

const initialState: DashboardState = {
  session: Maybe.none(),
  loading: true,
};

export function useDashboard(useCase: GetCurrentSessionUseCase) {
  const [state, setState] = useState<DashboardState>(initialState);

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

  return {
    session: state.session,
    loading: state.loading,
    checkSession,
  };
}
