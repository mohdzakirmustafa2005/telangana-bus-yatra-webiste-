
import { GoogleGenAI } from "@google/genai";

export async function getTravelPlan(prompt: string): Promise<string> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const fullPrompt = `You are a helpful travel assistant specializing in Telangana, India. A user is looking for travel advice. 
    Provide a concise, helpful, and friendly travel plan based on their request. Use markdown for formatting like lists and bold text.
    User Request: "${prompt}"`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching travel plan from Gemini:", error);
    if (error instanceof Error) {
        return `Sorry, I couldn't fetch a travel plan right now. Error: ${error.message}`;
    }
    return "An unknown error occurred while fetching the travel plan.";
  }
}
