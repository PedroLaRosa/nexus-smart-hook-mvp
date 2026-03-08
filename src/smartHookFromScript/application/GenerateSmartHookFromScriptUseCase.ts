import { SmartHookFromScriptGenerationPort } from './ports/SmartHookFromScriptGenerationPort';
import { SmartHookFromScriptDTO } from './SmartHookFromScriptDTO';

export class GenerateSmartHookFromScriptUseCase {
  constructor(private readonly generationPort: SmartHookFromScriptGenerationPort) {}

  async execute(scriptText: string): Promise<SmartHookFromScriptDTO> {
    const hookText = await this.generationPort.generate(scriptText);
    return { hookText, scriptText };
  }
}
