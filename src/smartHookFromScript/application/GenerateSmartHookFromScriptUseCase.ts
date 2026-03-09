import { SmartHookFromScriptGenerationPort } from './ports/SmartHookFromScriptGenerationPort';
import { SmartHookFromScriptDTO } from './SmartHookFromScriptDTO';

export class GenerateSmartHookFromScriptUseCase {
  constructor(private readonly generationPort: SmartHookFromScriptGenerationPort) {}

  async execute(scriptText: string): Promise<SmartHookFromScriptDTO> {
    const hooks = await this.generationPort.generate(scriptText);
    const [recommendedHook, ...alternatives] = hooks;
    return { recommendedHook, alternatives, scriptText };
  }
}
