import React, { useState } from 'react';
import { analyzeFinancialText } from './services/geminiService';
import { FinancialAnalysis } from './types';
import { SAMPLE_TEXT } from './constants';
import Dashboard from './components/Dashboard';
import { Activity, BarChart3, BrainCircuit, ChevronRight, Loader2, Target } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<FinancialAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await analyzeFinancialText(inputText);
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Please check your API Key or try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    setInputText(SAMPLE_TEXT);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">FinSight<span className="text-zinc-500">AI</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <span className="px-3 py-1 rounded-full bg-zinc-900 text-xs border border-zinc-800">v1.0.0 Beta</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero / Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Col: Input */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Instant Financial <br/>
                <span className="text-zinc-400">
                  Intelligence
                </span>
              </h1>
              <p className="text-zinc-400">
                Paste earnings calls, news articles, or reports to generate professional-grade summaries and sentiment analysis powered by Gemini 2.5.
              </p>
            </div>

            <div className="bg-zinc-950 p-1 rounded-2xl border border-zinc-800 shadow-xl">
              <div className="relative">
                <textarea
                  className="w-full h-64 bg-black p-4 rounded-xl text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-white resize-none scrollbar-thin scrollbar-thumb-zinc-800"
                  placeholder="Paste financial text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={loadSample}
                    className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-black hover:bg-zinc-900 rounded-lg border border-zinc-800 transition-colors"
                  >
                    Load Sample
                  </button>
                </div>
              </div>
              
              <div className="p-2">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !inputText}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    loading || !inputText
                      ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                      : 'bg-white hover:bg-zinc-200 text-black shadow-lg'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BrainCircuit className="w-5 h-5" />
                      Analyze Text
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instructions/Features Mini List */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Activity className="w-5 h-5 text-white mb-2" />
                    <h3 className="font-semibold text-white text-sm">Sentiment Scoring</h3>
                    <p className="text-xs text-zinc-500 mt-1">Quantifiable -100 to +100 market mood metrics.</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Target className="w-5 h-5 text-white mb-2" />
                    <h3 className="font-semibold text-white text-sm">Impact Analysis</h3>
                    <p className="text-xs text-zinc-500 mt-1">Actionable investment implications extracted instantly.</p>
                </div>
            </div>
          </div>

          {/* Right Col: Output */}
          <div className="lg:col-span-8">
            {error && (
              <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-300 mb-6 animate-in fade-in">
                {error}
              </div>
            )}

            {!result && !loading && !error && (
               <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-900 rounded-2xl p-8 bg-zinc-950/50">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-500">Ready to Analyze</h3>
                  <p className="text-zinc-600 max-w-md mt-2">
                    Your results will appear here. Paste a financial report, earnings transcript, or market news to begin.
                  </p>
                  <button onClick={loadSample} className="mt-6 text-zinc-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                    Try with sample data <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
            )}

            {loading && (
               <div className="h-full min-h-[500px] flex flex-col items-center justify-center rounded-2xl bg-zinc-950/50 border border-zinc-900">
                  <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
                  <h3 className="text-lg font-medium text-white">Processing Financial Data</h3>
                  <p className="text-zinc-500 mt-2 animate-pulse">Extracting entities and calculating sentiment...</p>
               </div>
            )}

            {result && <Dashboard data={result} />}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;