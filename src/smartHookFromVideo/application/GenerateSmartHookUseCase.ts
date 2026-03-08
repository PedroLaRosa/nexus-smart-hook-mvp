import { SmartHookGenerationPort } from './ports/SmartHookGenerationPort';
import { SmartHookDTO } from './SmartHookDTO';

export class GenerateSmartHookUseCase {
  constructor(private readonly generationPort: SmartHookGenerationPort) {}

  async execute(videoUrl: string): Promise<SmartHookDTO> {
    const hookText = await this.generationPort.generate(videoUrl);
    return { hookText, videoUrl };
  }
}
