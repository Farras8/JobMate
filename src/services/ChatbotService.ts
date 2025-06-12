// src/services/ChatbotService.ts

export interface ChatbotResponse {
  answer: string;
  confidence: number;
}

export interface ChatbotError {
  error: string;
  message?: string;
}

class ChatbotService {
  private readonly API_BASE_URL = 'https://faq-jobmate-api-705829099986.asia-southeast2.run.app';
  private readonly FAQ_ENDPOINT = '/faq';

  /**
   * Send question to FAQ API and get response
   */
  async askQuestion(question: string): Promise<ChatbotResponse> {
    try {
      if (!question.trim()) {
        throw new Error('Question cannot be empty');
      }

      const response = await fetch(`${this.API_BASE_URL}${this.FAQ_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim()
        })
      });

      if (!response.ok) {
        // Handle different HTTP status codes
        if (response.status === 400) {
          throw new Error('Invalid question format');
        } else if (response.status === 500) {
          throw new Error('Server error occurred');
        } else if (response.status >= 500) {
          throw new Error('Service temporarily unavailable');
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      }

      const data: ChatbotResponse = await response.json();
      
      // Validate response structure
      if (!data.answer || typeof data.confidence !== 'number') {
        throw new Error('Invalid response format from server');
      }

      return data;
    } catch (error) {
      console.error('ChatbotService Error:', error);
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to chatbot service');
      }
      
      // Re-throw known errors
      if (error instanceof Error) {
        throw error;
      }
      
      // Handle unknown errors
      throw new Error('An unexpected error occurred');
    }
  }

  /**
   * Get fallback response when API is unavailable or returns low confidence
   */
  getFallbackResponse(question: string): string {
    const input = question.toLowerCase();
    
    // Basic keyword matching as fallback
    if (input.includes('lowongan') || input.includes('kerja') || input.includes('job')) {
      return 'Untuk mencari lowongan kerja, Anda bisa menggunakan fitur JobSearch di menu utama. Saya juga bisa membantu memberikan tips untuk melamar pekerjaan. Ada posisi tertentu yang Anda cari?';
    } else if (input.includes('cv') || input.includes('resume')) {
      return 'Untuk review CV, kami memiliki fitur CV Review yang bisa menganalisis dan memberikan saran perbaikan CV Anda. Apakah Anda ingin tips untuk membuat CV yang menarik?';
    } else if (input.includes('interview') || input.includes('wawancara')) {
      return 'Kami memiliki fitur AI Interview untuk simulasi wawancara kerja! Ini akan membantu Anda berlatih sebelum wawancara yang sesungguhnya. Mau saya berikan tips wawancara kerja?';
    } else if (input.includes('gaji') || input.includes('salary')) {
      return 'Untuk informasi gaji, biasanya tergantung pada posisi, pengalaman, dan lokasi kerja. Saya bisa membantu memberikan tips negosiasi gaji. Posisi apa yang Anda minati?';
    } else if (input.includes('terima kasih') || input.includes('thanks')) {
      return 'Sama-sama! Senang bisa membantu. Jangan ragu untuk bertanya lagi jika ada yang ingin Anda tanyakan tentang karir atau lowongan kerja. 😊';
    } else if (input.includes('halo') || input.includes('hai') || input.includes('hello')) {
      return 'Halo! Selamat datang di JobMate. Saya siap membantu Anda dengan berbagai pertanyaan seputar karir, pencarian kerja, tips interview, dan banyak lagi. Ada yang bisa saya bantu?';
    } else {
      return 'Maaf, saya sedang mengalami masalah teknis. Silakan coba lagi nanti atau hubungi tim support kami untuk bantuan lebih lanjut.';
    }
  }

  /**
   * Process user question with fallback mechanism
   */
  async processQuestion(question: string, confidenceThreshold: number = 0.7): Promise<{
    response: string;
    confidence: number;
    source: 'api' | 'fallback';
  }> {
    try {
      const apiResponse = await this.askQuestion(question);
      
      // Check if confidence is above threshold
      if (apiResponse.confidence >= confidenceThreshold) {
        return {
          response: apiResponse.answer,
          confidence: apiResponse.confidence,
          source: 'api'
        };
      } else {
        // Low confidence, use fallback
        return {
          response: this.getFallbackResponse(question),
          confidence: 0.5,
          source: 'fallback'
        };
      }
    } catch (error) {
      console.warn('API unavailable, using fallback response:', error);
      
      return {
        response: this.getFallbackResponse(question),
        confidence: 0.5,
        source: 'fallback'
      };
    }
  }

  /**
   * Health check for the API
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/health`, {
        method: 'GET',
        timeout: 5000 // 5 second timeout
      });
      return response.ok;
    } catch (error) {
      console.warn('Health check failed:', error);
      return false;
    }
  }

  /**
   * Get suggested quick actions based on common queries
   */
  getQuickActions(): string[] {
    return [
      'Cari lowongan kerja terbaru',
      'Apa itu JobMate?',
      'Gimana cara daftar di JobMate?'
    ];
  }
}

// Export singleton instance
export const chatbotService = new ChatbotService();
export default ChatbotService;