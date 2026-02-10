
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types.ts";

// Menggunakan pengecekan aman untuk process.env di lingkungan browser
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env) ? process.env.API_KEY || "" : "";
  } catch (e) {
    return "";
  }
};

export const getAiResponse = async (history: ChatMessage[], userMessage: string) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error("API Key Gemini tidak ditemukan.");
    return "Maaf, sistem AI sedang tidak tersedia karena konfigurasi API Key belum lengkap.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are the NeuralPhone AI Customer Service. You are helpful, tech-savvy, and polite. 
        Company: NeuralPhone. 
        Products: Asus ROG, iPhone, Samsung Galaxy S series, Tecno Pova, Infinix, and iPads.
        Payments: GoPay, Dana, SeaBank, PayPal.
        Tone: Professional yet friendly. Answer questions about specific phone specs, store policies, or shipping.
        Language: Use Indonesian by default if the user speaks Indonesian, otherwise English.`,
      }
    });

    return response.text || "Mohon maaf, saya sedang mengalami kendala teknis. Ada yang bisa saya bantu lainnya?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi server AI kami. Silakan coba sesaat lagi.";
  }
};
