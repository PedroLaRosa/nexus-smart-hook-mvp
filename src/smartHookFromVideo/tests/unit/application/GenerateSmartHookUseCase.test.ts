import { describe, it, expect } from 'vitest';
import { GenerateSmartHookUseCase } from '../../../application/GenerateSmartHookUseCase';
import { InMemorySmartHookGenerationPort } from '../../../application/ports/SmartHookGenerationPort';

describe('The GenerateSmartHookUseCase', () => {
  it('generates a hook for a given video url', async () => {
    const hookText = 'Stop scrolling! This will change how you think about productivity forever.';
    const videoUrl = 'https://www.youtube.com/watch?v=abc123';
    const port = InMemorySmartHookGenerationPort.withHookText(hookText);
    const useCase = new GenerateSmartHookUseCase(port);

    const result = await useCase.execute(videoUrl);

    expect(result.hookText).toBe(hookText);
    expect(result.videoUrl).toBe(videoUrl);
  });

  it('propagates errors from the generation port', async () => {
    const port = InMemorySmartHookGenerationPort.withError();
    const useCase = new GenerateSmartHookUseCase(port);

    await expect(useCase.execute('https://youtube.com/watch?v=abc')).rejects.toThrow('Generation failed');
  });
});
