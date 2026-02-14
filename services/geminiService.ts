
import { GoogleGenAI, Type } from "@google/genai";
import { InvestmentProfile, MutualFund } from "../types";

// The API key is obtained exclusively from the environment variable process.env.API_KEY.
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getFundSuggestions = async (profile: InvestmentProfile): Promise<MutualFund[]> => {
  const ai = getAIClient();
  const prompt = `Suggest top 4 mutual funds (Indian market context but generic enough) based on these criteria:
    Investment Amount: ₹${profile.amount}
    Horizon: ${profile.period} years
    Risk Appetite: ${profile.risk}
    Category Preference: ${profile.category}

    Return a list of funds with their historical performance metrics and a brief reasoning for each. Ensure the response is valid JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              riskRating: { type: Type.STRING },
              expenseRatio: { type: Type.NUMBER },
              historicalReturns: {
                type: Type.OBJECT,
                properties: {
                  oneYear: { type: Type.NUMBER },
                  threeYear: { type: Type.NUMBER },
                  fiveYear: { type: Type.NUMBER }
                },
                required: ["oneYear", "threeYear", "fiveYear"]
              },
              description: { type: Type.STRING },
              whyThisFund: { type: Type.STRING }
            },
            required: ["name", "category", "riskRating", "expenseRatio", "historicalReturns", "description", "whyThisFund"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as MutualFund[];
  } catch (error) {
    console.error("Error fetching fund suggestions from Gemini API:", error);
    // Return empty array instead of crashing
    return [];
  }
};
