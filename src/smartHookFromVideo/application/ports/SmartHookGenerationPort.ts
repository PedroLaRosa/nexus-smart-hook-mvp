import { Url } from '../../../shared/domain/value-objects/Url';

export interface SmartHookGenerationPort {
  generate(videoUrl: Url): Promise<string>;
}

export class InMemorySmartHookGenerationPort implements SmartHookGenerationPort {
  private constructor(
    private readonly hookText: string,
    private readonly shouldFail: boolean
  ) {}

  static withHookText(hookText: string): InMemorySmartHookGenerationPort {
    return new InMemorySmartHookGenerationPort(hookText, false);
  }

  static withError(): InMemorySmartHookGenerationPort {
    return new InMemorySmartHookGenerationPort('', true);
  }

  async generate(_videoUrl: Url): Promise<string> {
    if (this.shouldFail) {
      throw new Error('Generation failed');
    }
    return this.hookText;
  }
}
