# FinSight AI 📈
<img width="1512" height="737" alt="Screenshot 2025-11-19 at 9 40 31 PM" src="https://github.com/user-attachments/assets/80fc6e87-47b6-451f-ab4b-41a14ddc3a5d" />

**Instant Financial Intelligence & Sentiment Analysis**

FinSight AI is a professional-grade financial analysis tool powered by Google's **Gemini 2.5 Flash** model. It processes earnings calls, news articles, and financial reports to generate actionable investment insights, sentiment scoring, and executive summaries in real-time.

## ✨ Features

- **Advanced Sentiment Engine**: Quantifiable market mood metrics ranging from **-100 (Bearish)** to **+100 (Bullish)**.
- **Executive Summaries**: Distills complex financial text into concise, high-level overviews.
- **Entity Extraction**: Automatically identifies companies, people, and assets (Crypto/Commodities) and assigns individual sentiment scores.
- **Risk & Driver Analysis**: Isolates key market drivers and potential risk factors.
- **Investment Implications**: Provides actionable strategic advice based on the analyzed text.
- **Monochrome Aesthetic**: A sleek, high-contrast "Black & White" UI designed for professional financial environments.
<img width="463" height="548" alt="Screenshot 2025-11-19 at 9 40 56 PM" src="https://github.com/user-attachments/assets/0d9c77e5-c616-454c-8ec3-0ec1bca749a9" />

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite*
- **Styling**: Tailwind CSS (Dark Mode / Monochrome)
- **AI Model**: Google Gemini 2.5 Flash (`@google/genai` SDK)
- **Visualization**: Recharts (Custom Gauge & Charts)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google AI Studio API Key ([Get it here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finsight-ai.git
   cd finsight-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   Create a `.env` file in the root directory and add your Google Gemini API Key:
   ```env
   API_KEY=your_google_api_key_here
   ```

   *Note: Ensure your bundler is configured to expose `process.env.API_KEY` or adjust `services/geminiService.ts` to match your environment variable naming convention (e.g., `VITE_API_KEY` for Vite).*

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📖 Usage

1. Open the application in your browser.
2. Paste a financial text (e.g., an earnings call transcript, a Bloomberg article, or a market report) into the input field.
3. Click **Analyze Text**.
4. Review the generated dashboard containing the sentiment gauge, extracted entities, and strategic insights.
5. Click **Copy Report** to save a formatted text version to your clipboard for emails or Slack.

## 📂 Project Structure

```
finsight-ai/
├── components/         # UI Components (Dashboard, Gauge, Tables)
├── services/           # API Integration (Gemini AI)
├── types/              # TypeScript Interfaces
├── constants.ts        # Sample data and config
├── App.tsx             # Main Application Entry
└── index.html          # HTML Root & Tailwind Config
```

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built for the modern financial analyst.*
