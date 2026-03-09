import { SmartHookGenerationPort } from './ports/SmartHookGenerationPort';
import { SmartHookDTO } from './SmartHookDTO';
import { Url } from '../../shared/domain/value-objects/Url';

export class GenerateSmartHookUseCase {
  constructor(private readonly generationPort: SmartHookGenerationPort) {}

  async execute(videoUrl: string): Promise<SmartHookDTO> {
    const url = Url.create(videoUrl);
    const hookText = await this.generationPort.generate(url);
    return { hookText, videoUrl: url.value };
  }
}
