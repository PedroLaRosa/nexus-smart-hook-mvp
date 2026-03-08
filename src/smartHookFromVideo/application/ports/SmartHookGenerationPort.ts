export interface SmartHookGenerationPort {
  generate(videoUrl: string): Promise<string>;
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

  async generate(_videoUrl: string): Promise<string> {
    if (this.shouldFail) {
      throw new Error('Generation failed');
    }
    return this.hookText;
  }
}
