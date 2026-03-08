import { useState } from 'react';
import { Maybe } from '../../../shared/domain/Maybe';
import { SmartHookFromScriptDTO } from '../../application/SmartHookFromScriptDTO';
import { GenerateSmartHookFromScriptUseCase } from '../../application/GenerateSmartHookFromScriptUseCase';

interface SmartHookFromScriptState {
  hookResult: Maybe<SmartHookFromScriptDTO>;
  loading: boolean;
  error: Maybe<Error>;
  scriptText: string;
}

const initialState: SmartHookFromScriptState = {
  hookResult: Maybe.none(),
  loading: false,
  error: Maybe.none(),
  scriptText: '',
};

export function useSmartHookFromScript(useCase: GenerateSmartHookFromScriptUseCase) {
  const [state, setState] = useState<SmartHookFromScriptState>(initialState);

  const setScriptText = (text: string) => {
    setState((prev) => ({ ...prev, scriptText: text }));
  };

  const startLoading = () => {
    setState((prev) => ({ ...prev, loading: true, error: Maybe.none() }));
  };

  const setHookResult = (result: SmartHookFromScriptDTO) => {
    setState((prev) => ({ ...prev, hookResult: Maybe.some(result), loading: false }));
  };

  const setError = (error: Error) => {
    setState((prev) => ({ ...prev, error: Maybe.some(error), loading: false }));
  };

  const generateHook = async () => {
    startLoading();
    try {
      const result = await useCase.execute(state.scriptText);
      setHookResult(result);
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    hookResult: state.hookResult,
    loading: state.loading,
    error: state.error,
    scriptText: state.scriptText,
    setScriptText,
    generateHook,
  };
}
