import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSmartHookFromScript } from '../../../../infrastructure/ui/SmartHookFromScript.hook';
import { GenerateSmartHookFromScriptUseCase } from '../../../../application/GenerateSmartHookFromScriptUseCase';
import { InMemorySmartHookFromScriptGenerationPort } from '../../../../application/ports/SmartHookFromScriptGenerationPort';

describe('The useSmartHookFromScript hook', () => {
  it('starts with empty state', () => {
    const port = InMemorySmartHookFromScriptGenerationPort.withHookText('hook');
    const useCase = new GenerateSmartHookFromScriptUseCase(port);

    const { result } = renderHook(() => useSmartHookFromScript(useCase));

    expect(result.current.hookResult.isNone()).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error.isNone()).toBe(true);
    expect(result.current.scriptText).toBe('');
  });

  it('updates script text when set', () => {
    const port = InMemorySmartHookFromScriptGenerationPort.withHookText('hook');
    const useCase = new GenerateSmartHookFromScriptUseCase(port);
    const { result } = renderHook(() => useSmartHookFromScript(useCase));

    act(() => {
      result.current.setScriptText('Hey everyone, today I want to talk about...');
    });

    expect(result.current.scriptText).toBe('Hey everyone, today I want to talk about...');
  });

  it('generates hook and stores result', async () => {
    const hookText = 'Stop scrolling! You need to see this.';
    const scriptText = 'Hey everyone, today I want to share the 5 habits that changed my life completely.';
    const port = InMemorySmartHookFromScriptGenerationPort.withHookText(hookText);
    const useCase = new GenerateSmartHookFromScriptUseCase(port);
    const { result } = renderHook(() => useSmartHookFromScript(useCase));

    act(() => {
      result.current.setScriptText(scriptText);
    });

    await act(async () => {
      await result.current.generateHook();
    });

    expect(result.current.hookResult.isSome()).toBe(true);
    expect(result.current.hookResult.getOrThrow().recommendedHook).toBe(hookText);
    expect(result.current.hookResult.getOrThrow().alternatives.length).toBe(10);
    expect(result.current.hookResult.getOrThrow().scriptText).toBe(scriptText);
    expect(result.current.loading).toBe(false);
  });

  it('captures error when generation fails', async () => {
    const port = InMemorySmartHookFromScriptGenerationPort.withError();
    const useCase = new GenerateSmartHookFromScriptUseCase(port);
    const { result } = renderHook(() => useSmartHookFromScript(useCase));

    act(() => {
      result.current.setScriptText('some script text');
    });

    await act(async () => {
      await result.current.generateHook();
    });

    expect(result.current.error.isSome()).toBe(true);
    expect(result.current.hookResult.isNone()).toBe(true);
    expect(result.current.loading).toBe(false);
  });
});
