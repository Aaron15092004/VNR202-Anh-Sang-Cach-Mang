import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.genAI = null;

    if (this.apiKey && this.apiKey !== "your_gemini_api_key_here") {
      try {
        this.genAI = new GoogleGenAI({ apiKey: this.apiKey });
        console.log("✅ Gemini Service initialized successfully");
      } catch (error) {
        console.error("❌ Error initializing Gemini service:", error);
      }
    } else {
      console.warn("⚠️ API key not provided or invalid");
    }
  }

  async generateResponse(prompt) {
    console.log("Generate response called");
    console.log("API key status:", this.apiKey ? "Present" : "Missing");
    console.log("GenAI instance:", this.genAI ? "Present" : "Missing");

    if (
      !this.genAI ||
      !this.apiKey ||
      this.apiKey === "your_gemini_api_key_here"
    ) {
      throw new Error("API key chưa được cấu hình. Vui lòng kiểm tra lại.");
    }

    try {
      console.log("Calling Gemini API...");

      const response = await this.genAI.models.generateContent({
        model: "gemini-2.5-flash-lite", // ⭐ Giữ nguyên model này
        contents: prompt,
      });

      console.log("API Response:", response);

      if (!response.text) {
        throw new Error("Không nhận được phản hồi từ Gemini API");
      }

      return response.text;
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw new Error(`Lỗi khi xử lý: ${error.message}`);
    }
  }

  getApiKeyStatus() {
    if (!this.apiKey || this.apiKey === "your_gemini_api_key_here") {
      return {
        isValid: false,
        message: "API key chưa được cấu hình.",
      };
    }

    return {
      isValid: true,
      message: "API key đã được cấu hình",
    };
  }
}

// Export function để tạo instance mới
export const createGeminiService = (apiKey) => {
  return new GeminiService(apiKey);
};
