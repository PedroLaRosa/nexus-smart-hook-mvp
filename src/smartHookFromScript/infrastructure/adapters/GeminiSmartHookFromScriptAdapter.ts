import { GoogleGenerativeAI } from '@google/generative-ai';
import { SmartHookFromScriptGenerationPort } from '../../application/ports/SmartHookFromScriptGenerationPort';

const prompt = `Given the following video script, write the hook for the first 3 seconds of the video.
The hook should be a direct, spoken script (not a description) — exactly what the creator should say or show in those 3 seconds.
Keep it under 20 words, punchy, and immediately compelling.
Respond with only the hook text, no explanation.

Script:
`;

export class GeminiSmartHookFromScriptAdapter implements SmartHookFromScriptGenerationPort {
  constructor(private readonly apiKey: string) {}

  async generate(scriptText: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([{ text: `${prompt}${scriptText}` }]);

    return result.response.text().trim();
  }
}
