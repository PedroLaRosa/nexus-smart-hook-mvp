import { useState } from 'react';
import { Maybe } from '../../../shared/domain/Maybe';
import { SmartHookDTO } from '../../application/SmartHookDTO';
import { GenerateSmartHookUseCase } from '../../application/GenerateSmartHookUseCase';

interface SmartHookState {
  hookResult: Maybe<SmartHookDTO>;
  loading: boolean;
  error: Maybe<Error>;
  videoUrl: string;
}

const initialState: SmartHookState = {
  hookResult: Maybe.none(),
  loading: false,
  error: Maybe.none(),
  videoUrl: '',
};

export function useSmartHookFromVideo(useCase: GenerateSmartHookUseCase) {
  const [state, setState] = useState<SmartHookState>(initialState);

  const setVideoUrl = (url: string) => {
    setState((prev) => ({ ...prev, videoUrl: url }));
  };

  const startLoading = () => {
    setState((prev) => ({ ...prev, loading: true, error: Maybe.none() }));
  };

  const setHookResult = (result: SmartHookDTO) => {
    setState((prev) => ({ ...prev, hookResult: Maybe.some(result), loading: false }));
  };

  const setError = (error: Error) => {
    setState((prev) => ({ ...prev, error: Maybe.some(error), loading: false }));
  };

  const generateHook = async () => {
    startLoading();
    try {
      const result = await useCase.execute(state.videoUrl);
      setHookResult(result);
    } catch (error) {
      setError(error as Error);
    }
  };

  return {
    hookResult: state.hookResult,
    loading: state.loading,
    error: state.error,
    videoUrl: state.videoUrl,
    setVideoUrl,
    generateHook,
  };
}
