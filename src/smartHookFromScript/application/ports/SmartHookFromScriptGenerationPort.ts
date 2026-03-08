export interface SmartHookFromScriptGenerationPort {
  generate(scriptText: string): Promise<string>;
}

export class InMemorySmartHookFromScriptGenerationPort implements SmartHookFromScriptGenerationPort {
  private constructor(
    private readonly hookText: string,
    private readonly shouldFail: boolean
  ) {}

  static withHookText(hookText: string): InMemorySmartHookFromScriptGenerationPort {
    return new InMemorySmartHookFromScriptGenerationPort(hookText, false);
  }

  static withError(): InMemorySmartHookFromScriptGenerationPort {
    return new InMemorySmartHookFromScriptGenerationPort('', true);
  }

  async generate(_scriptText: string): Promise<string> {
    if (this.shouldFail) {
      throw new Error('Generation failed');
    }
    return this.hookText;
  }
}
