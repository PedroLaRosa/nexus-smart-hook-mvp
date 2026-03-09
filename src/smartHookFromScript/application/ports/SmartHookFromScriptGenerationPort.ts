export interface SmartHookFromScriptGenerationPort {
  generate(scriptText: string): Promise<string[]>;
}

export class InMemorySmartHookFromScriptGenerationPort implements SmartHookFromScriptGenerationPort {
  private constructor(
    private readonly hooks: string[],
    private readonly shouldFail: boolean
  ) {}

  static withHooks(hooks: string[]): InMemorySmartHookFromScriptGenerationPort {
    return new InMemorySmartHookFromScriptGenerationPort(hooks, false);
  }

  static withHookText(hookText: string): InMemorySmartHookFromScriptGenerationPort {
    const hooks = [hookText, ...Array.from({ length: 10 }, (_, i) => `Alternative ${i + 1}`)];
    return new InMemorySmartHookFromScriptGenerationPort(hooks, false);
  }

  static withError(): InMemorySmartHookFromScriptGenerationPort {
    return new InMemorySmartHookFromScriptGenerationPort([], true);
  }

  async generate(_scriptText: string): Promise<string[]> {
    if (this.shouldFail) {
      throw new Error('Generation failed');
    }
    return this.hooks;
  }
}
