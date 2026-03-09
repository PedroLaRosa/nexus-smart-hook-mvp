import { GoogleGenerativeAI } from '@google/generative-ai';
import { SmartHookFromScriptGenerationPort } from '../../application/ports/SmartHookFromScriptGenerationPort';

const prompt = `Given the following video script, generate 11 hook options for the first 3 seconds of the video.
Each hook should be a direct, spoken script (not a description) — exactly what the creator should say in those 3 seconds.
Keep each hook under 20 words, punchy, and immediately compelling.
Order them from best to worst. The first one is your top recommendation.
Respond with exactly 11 lines, each starting with the number and a period (e.g. "1. Hook text here").
No extra explanation, just the 11 numbered hooks.

Script:
`;

function parseHooks(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^\d+\.\s*/, '').trim())
    .filter((line) => line.length > 0)
    .slice(0, 11);
}

export class GeminiSmartHookFromScriptAdapter implements SmartHookFromScriptGenerationPort {
  constructor(private readonly apiKey: string) {}

  async generate(scriptText: string): Promise<string[]> {
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([{ text: `${prompt}${scriptText}` }]);

    return parseHooks(result.response.text().trim());
  }
}
