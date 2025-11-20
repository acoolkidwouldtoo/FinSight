import { GoogleGenAI, Type } from "@google/genai";
import { FinancialAnalysis } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is not defined in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

export const analyzeFinancialText = async (text: string): Promise<FinancialAnalysis> => {
  const prompt = `
    You are a senior financial analyst utilizing advanced NLP to extract insights for portfolio management.
    Analyze the following financial text (news article, earnings call, or report).
    
    Provide a structured analysis including:
    1. A punchy headline.
    2. An executive summary (max 3 sentences).
    3. A sentiment score from -100 (Extremely Bearish) to 100 (Extremely Bullish).
    4. A sentiment label.
    5. Key market drivers identified in the text.
    6. Specific investment implications (buy/sell/hold signals or strategic advice).
    7. Potential risk factors mentioned or implied.
    8. Extracted entities (Companies, People, etc.) with their individual sentiment context.

    Text to analyze:
    "${text}"
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a strict, professional financial analyst. Be concise, data-driven, and objective.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          executiveSummary: { type: Type.STRING },
          sentimentScore: { type: Type.INTEGER, description: "Integer between -100 and 100" },
          sentimentLabel: { type: Type.STRING, enum: ["Bullish", "Bearish", "Neutral", "Cautious", "Optimistic"] },
          keyDrivers: { type: Type.ARRAY, items: { type: Type.STRING } },
          investmentImplications: { type: Type.STRING },
          riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
          entities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                ticker: { type: Type.STRING, nullable: true },
                type: { type: Type.STRING, enum: ["Company", "Person", "Sector", "Crypto", "Commodity"] },
                sentiment: { type: Type.STRING, enum: ["Bullish", "Bearish", "Neutral", "Cautious", "Optimistic"] },
                relevanceScore: { type: Type.INTEGER }
              },
              required: ["name", "type", "sentiment", "relevanceScore"]
            }
          }
        },
        required: ["headline", "executiveSummary", "sentimentScore", "sentimentLabel", "keyDrivers", "investmentImplications", "riskFactors", "entities"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as FinancialAnalysis;
  }
  
  throw new Error("Failed to generate analysis");
};
