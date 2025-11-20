import React, { useState } from 'react';
import { FinancialAnalysis } from '../types';
import SentimentGauge from './SentimentGauge';
import EntityTable from './EntityTable';
import { AlertTriangle, ArrowRightCircle, FileText, Target, Copy, Check } from 'lucide-react';

interface DashboardProps {
  data: FinancialAnalysis;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const report = `FINANCIAL ANALYSIS REPORT
Headline: ${data.headline}
Sentiment: ${data.sentimentLabel} (${data.sentimentScore})

EXECUTIVE SUMMARY
${data.executiveSummary}

KEY DRIVERS
${data.keyDrivers.map(d => `- ${d}`).join('\n')}

RISKS
${data.riskFactors.map(r => `- ${r}`).join('\n')}

IMPLICATIONS
${data.investmentImplications}
`.trim();

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSentimentBadgeStyles = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('bull') || l.includes('optimist')) {
      return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
    }
    if (l.includes('bear') || l.includes('cautious')) {
      return 'border-red-500/30 bg-red-500/10 text-red-400';
    }
    return 'border-zinc-700 bg-zinc-800 text-zinc-300';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl shadow-none">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{data.headline}</h2>
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSentimentBadgeStyles(data.sentimentLabel)}`}>
                {data.sentimentLabel}
              </span>
            </div>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-black hover:bg-zinc-900 border border-zinc-700 rounded-lg transition-all hover:text-white"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Report'}
          </button>
        </div>
      </div>

      {/* Top Grid: Sentiment & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sentiment Gauge Card */}
        <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 p-6 rounded-xl flex flex-col min-h-[340px]">
          <h3 className="text-zinc-400 text-sm uppercase font-semibold w-full flex items-center gap-2 shrink-0">
            <Target className="w-4 h-4" /> Market Sentiment
          </h3>
          {/* Added shrink-0 to ensure the gauge maintains its height and doesn't get crushed */}
          <div className="flex-1 w-full mt-4 flex flex-col justify-end shrink-0">
             <SentimentGauge score={data.sentimentScore} />
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 rounded-xl flex flex-col h-full">
          <h3 className="text-zinc-400 text-sm uppercase font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Executive Summary
          </h3>
          <p className="text-zinc-200 leading-relaxed text-lg flex-1">
            {data.executiveSummary}
          </p>
          
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <ArrowRightCircle className="w-4 h-4" /> Investment Implications
            </h4>
            <p className="text-zinc-400 text-sm italic">
                "{data.investmentImplications}"
            </p>
          </div>
        </div>
      </div>

      {/* Middle Grid: Drivers & Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-zinc-400 text-sm uppercase font-semibold mb-4">Key Market Drivers</h3>
          <ul className="space-y-3">
            {data.keyDrivers.map((driver, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
                {driver}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-zinc-400 text-sm uppercase font-semibold mb-4 flex items-center gap-2">
             <AlertTriangle className="w-4 h-4 text-red-500" /> Risk Factors
          </h3>
          <ul className="space-y-3">
            {data.riskFactors.map((risk, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-red-500 shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: Entity Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
         <div className="p-6 border-b border-zinc-800">
            <h3 className="text-zinc-400 text-sm uppercase font-semibold">Detected Entities & Assets</h3>
         </div>
         <EntityTable entities={data.entities} />
      </div>

    </div>
  );
};

export default Dashboard;