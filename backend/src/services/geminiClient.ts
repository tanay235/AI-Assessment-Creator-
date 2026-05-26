import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';

const DEFAULT_MODELS = [
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-8b',
];

export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error(
      'GEMINI_API_KEY is missing. Add it to backend/.env — create one at https://aistudio.google.com/apikey'
    );
  }
  return key;
}

export function getModelCandidates(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  if (preferred) {
    return [preferred, ...DEFAULT_MODELS.filter((m) => m !== preferred)];
  }
  return DEFAULT_MODELS;
}

/** Turns raw Gemini SDK errors into short messages for the UI. */
export function formatGeminiError(err: unknown): string {
  const msg = (err instanceof Error ? err.message : String(err));

  if (msg.includes('leaked') || (msg.includes('403') && msg.includes('API key'))) {
    return 'Your Gemini API key was blocked (reported as leaked). Create a new key at https://aistudio.google.com/apikey and update GEMINI_API_KEY in backend/.env, then restart the backend.';
  }

  if (
    msg.includes('429') ||
    msg.includes('quota') ||
    msg.includes('Quota exceeded') ||
    msg.includes('RESOURCE_EXHAUSTED')
  ) {
    return 'Gemini free-tier quota is used up for this model. Wait 1–2 minutes and try again, or set GEMINI_MODEL=gemini-1.5-flash in backend/.env. You can also create a fresh API key at https://aistudio.google.com/apikey';
  }

  if (msg.includes('API key not valid') || msg.includes('API_KEY_INVALID')) {
    return 'Invalid Gemini API key. Check GEMINI_API_KEY in backend/.env and restart the backend.';
  }

  if (msg.length > 280) {
    return `${msg.slice(0, 280)}…`;
  }

  return msg || 'Gemini generation failed';
}

type ContentPart = { text: string } | { inlineData: { data: string; mimeType: string } };

export async function generateContentWithFallback(
  parts: ContentPart[]
): Promise<{ text: string; modelUsed: string }> {
  const genAI = new GoogleGenerativeAI(getGeminiApiKey());
  const models = getModelCandidates();
  const errors: string[] = [];

  for (const modelName of models) {
    try {
      console.log(`[Gemini] Trying model: ${modelName}`);
      const model: GenerativeModel = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(parts);
      const text = result.response.text();
      if (!text?.trim()) {
        throw new Error('Empty response from model');
      }
      console.log(`[Gemini] Success with model: ${modelName}`);
      return { text: text.trim(), modelUsed: modelName };
    } catch (err) {
      const brief = formatGeminiError(err);
      errors.push(`${modelName}: ${brief}`);
      console.warn(`[Gemini] ${modelName} failed:`, brief);

      // Don't retry other models if key is invalid or leaked
      if (brief.includes('blocked') || brief.includes('Invalid Gemini')) {
        throw new Error(brief);
      }
    }
  }

  throw new Error(
    `All Gemini models failed. ${errors.join(' | ')}`
  );
}
