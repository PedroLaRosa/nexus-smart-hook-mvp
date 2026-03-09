import { describe, it, expect } from 'vitest';
import { GenerateSmartHookUseCase } from '../../../application/GenerateSmartHookUseCase';
import { InMemorySmartHookGenerationPort } from '../../../application/ports/SmartHookGenerationPort';
import { DomainError } from '../../../../shared/domain/DomainError';

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

  it('throws a validation DomainError when URL is invalid', async () => {
    const port = InMemorySmartHookGenerationPort.withHookText('hook');
    const useCase = new GenerateSmartHookUseCase(port);

    try {
      await useCase.execute(':::bad');
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainError);
      expect((error as DomainError).type).toBe('validation');
    }
  });
});
