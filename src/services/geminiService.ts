import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getMotivationalQuote(streak: number, missedRecently: boolean): Promise<string> {
  const prompt = `
    Anda adalah asisten spiritual yang bijak dan membesarkan hati dalam aplikasi 'Qalbu'.
    Tugas Anda adalah memberikan satu kalimat motivasi pendek (maksimal 20 kata) dalam Bahasa Indonesia untuk menggiatkan pengguna agar rutin solat 5 waktu.
    
    Konteks Pengguna:
    - Streak saat ini: ${streak} hari.
    - Status: ${missedRecently ? 'Baru saja melewatkan solat' : 'Sedang dalam performa baik'}.
    
    Berikan pesan yang menyentuh hati, tidak menghakimi, dan menginspirasi. Bisa mencakup makna ketenangan, kedekatan dengan Tuhan, atau pentingnya istiqamah.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Solat adalah tiang agama. Mari jaga hubungan kita dengan Sang Pencipta.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Jadilah istiqamah, karena ketenangan sejati ada dalam sujudmu.";
  }
}
