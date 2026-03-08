import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSmartHookFromVideo } from '../../../../infrastructure/ui/SmartHookFromVideo.hook';
import { GenerateSmartHookUseCase } from '../../../../application/GenerateSmartHookUseCase';
import { InMemorySmartHookGenerationPort } from '../../../../application/ports/SmartHookGenerationPort';

describe('The useSmartHookFromVideo hook', () => {
  it('starts with empty state', () => {
    const port = InMemorySmartHookGenerationPort.withHookText('hook');
    const useCase = new GenerateSmartHookUseCase(port);

    const { result } = renderHook(() => useSmartHookFromVideo(useCase));

    expect(result.current.hookResult.isNone()).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error.isNone()).toBe(true);
    expect(result.current.videoUrl).toBe('');
  });

  it('updates video url when set', () => {
    const port = InMemorySmartHookGenerationPort.withHookText('hook');
    const useCase = new GenerateSmartHookUseCase(port);
    const { result } = renderHook(() => useSmartHookFromVideo(useCase));

    act(() => {
      result.current.setVideoUrl('https://youtube.com/watch?v=abc');
    });

    expect(result.current.videoUrl).toBe('https://youtube.com/watch?v=abc');
  });

  it('generates hook and stores result', async () => {
    const hookText = 'Stop scrolling! You need to see this.';
    const videoUrl = 'https://youtube.com/watch?v=abc';
    const port = InMemorySmartHookGenerationPort.withHookText(hookText);
    const useCase = new GenerateSmartHookUseCase(port);
    const { result } = renderHook(() => useSmartHookFromVideo(useCase));

    act(() => {
      result.current.setVideoUrl(videoUrl);
    });

    await act(async () => {
      await result.current.generateHook();
    });

    expect(result.current.hookResult.isSome()).toBe(true);
    expect(result.current.hookResult.getOrThrow().hookText).toBe(hookText);
    expect(result.current.hookResult.getOrThrow().videoUrl).toBe(videoUrl);
    expect(result.current.loading).toBe(false);
  });

  it('captures error when generation fails', async () => {
    const port = InMemorySmartHookGenerationPort.withError();
    const useCase = new GenerateSmartHookUseCase(port);
    const { result } = renderHook(() => useSmartHookFromVideo(useCase));

    act(() => {
      result.current.setVideoUrl('https://youtube.com/watch?v=abc');
    });

    await act(async () => {
      await result.current.generateHook();
    });

    expect(result.current.error.isSome()).toBe(true);
    expect(result.current.hookResult.isNone()).toBe(true);
    expect(result.current.loading).toBe(false);
  });
});
