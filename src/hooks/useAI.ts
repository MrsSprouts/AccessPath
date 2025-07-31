// src/hooks/useAI.ts
import { useState } from 'react';

interface AIResponse {
  tags?: Record<string, string>;
  summary?: string;
  error?: string;
}

const MODEL = 'gemini-2.0-flash'; // or "gemini-1.5-pro"
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const useAI = () => {
  const [loading, setLoading] = useState(false);

  const generateAIResponse = async (description: string): Promise<AIResponse> => {
    setLoading(true);
    try {
      const prompt = `
You are an expert in accessibility and OpenStreetMap tagging. Given the user description below, extract possible tags and summarize it.

User Description:
"${description}"

Respond in JSON format:
{
  "tags": { "key1": "value1", "key2": "value2" },
  "summary": "Human-readable short summary"
}
      `.trim();

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
              role: 'user'
            }
          ],
        })
      });

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
      const parsed: AIResponse = JSON.parse(text);
      return parsed;
    } catch (error: any) {
      console.error('AI error:', error);
      return { error: 'AI generation failed.' };
    } finally {
      setLoading(false);
    }
  };

  return { generateAIResponse, loading };
};

export default useAI;

export { useAI }