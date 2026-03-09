import { describe, it, expect } from 'vitest';
import { GenerateSmartHookFromScriptUseCase } from '../../../application/GenerateSmartHookFromScriptUseCase';
import { InMemorySmartHookFromScriptGenerationPort } from '../../../application/ports/SmartHookFromScriptGenerationPort';

describe('The GenerateSmartHookFromScriptUseCase', () => {
  it('generates a hook for a given script text', async () => {
    const hookText = 'Stop scrolling! This will change how you think about productivity forever.';
    const scriptText = 'Hey everyone, today I want to talk about the 5 habits that changed my life...';
    const port = InMemorySmartHookFromScriptGenerationPort.withHookText(hookText);
    const useCase = new GenerateSmartHookFromScriptUseCase(port);

    const result = await useCase.execute(scriptText);

    expect(result.recommendedHook).toBe(hookText);
    expect(result.alternatives.length).toBe(10);
    expect(result.scriptText).toBe(scriptText);
  });

  it('propagates errors from the generation port', async () => {
    const port = InMemorySmartHookFromScriptGenerationPort.withError();
    const useCase = new GenerateSmartHookFromScriptUseCase(port);

    await expect(useCase.execute('some script text')).rejects.toThrow('Generation failed');
  });
});
