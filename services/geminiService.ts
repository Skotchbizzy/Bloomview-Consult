import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: `
          You are the Bloomview Consults AI Assistant. 
          Your tone is professional, warm, supportive, and inspiring.
          You represent Bloomview Consults, which provides:
          1. IT Solutions (Web design, branding, networking, IoT).
          2. Study Abroad Consultancy (UK, USA, Canada).
          3. Academic Support (Dissertations, research, proofreading).
          
          Guidelines:
          - Always mention how Bloomview helps people "see opportunities clearly and grow confidently."
          - If someone asks about study abroad, emphasize our expertise in UK, USA, and Canada.
          - If someone asks about tech, focus on innovation and efficiency.
          - Be helpful but concise.
          - If you don't know an answer, suggest they "Book a Consultation" via the website form.
        `,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having a bit of trouble connecting to my knowledge base. Please reach out to our human team directly via the contact form!";
  }
};

export const getLatestNews = async (): Promise<BlogPost[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for and provide 3 extremely recent (today or this week) trending news articles about Artificial Intelligence, Tech Innovation, or International Education (specifically UK/USA/Canada). Return the results as a JSON array of objects with keys: title, excerpt, date, category (AI, Tech, or Innovation), image (a high-quality Unsplash URL), and readTime. Ensure you use Google Search to get real-time info.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              date: { type: Type.STRING },
              category: { type: Type.STRING },
              image: { type: Type.STRING },
              readTime: { type: Type.STRING },
            },
            required: ["title", "excerpt", "date", "category", "image", "readTime"],
          },
        },
      },
    });

    const newsData = JSON.parse(response.text || "[]");
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Attempt to map specific URLs from search results to each post
    return newsData.map((item: any, index: number) => {
      // Find a likely URI from the grounding chunks
      const sourceUrl = chunks[index]?.web?.uri || chunks[0]?.web?.uri || "https://news.google.com";
      return {
        ...item,
        id: `dynamic-${Date.now()}-${index}`,
        url: sourceUrl
      };
    });
  } catch (error) {
    console.error("Error fetching live news:", error);
    throw error;
  }
};
