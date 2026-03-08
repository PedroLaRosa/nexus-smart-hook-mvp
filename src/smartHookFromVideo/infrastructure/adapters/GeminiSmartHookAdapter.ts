import { GoogleGenerativeAI } from '@google/generative-ai';
import { SmartHookGenerationPort } from '../../application/ports/SmartHookGenerationPort';

const prompt = `You are an expert video content strategist.
Analyze the provided video and write the hook script for the first 3 seconds that will capture maximum viewer attention.
The hook should be a direct, spoken script (not a description) — exactly what the creator should say or show in those 3 seconds.
Keep it under 20 words, punchy, and immediately compelling.
Respond with only the hook text, no explanation.`;

export class GeminiSmartHookAdapter implements SmartHookGenerationPort {
  constructor(private readonly apiKey: string) {}

  async generate(videoUrl: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      { text: prompt },
      {
        fileData: {
          mimeType: 'video/mp4',
          fileUri: videoUrl,
        },
      },
    ]);

    return result.response.text().trim();
  }
}
