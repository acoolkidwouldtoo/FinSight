import React from 'react';
import { Entity } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface EntityTableProps {
  entities: Entity[];
}

const EntityTable: React.FC<EntityTableProps> = ({ entities }) => {
  if (!entities || entities.length === 0) return null;

  const getSentimentStyles = (sentiment: string) => {
    const s = sentiment.toLowerCase();
    if (s.includes('bull') || s.includes('optimist')) {
        return { 
            icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, 
            textClass: 'text-emerald-400',
            barClass: 'bg-emerald-500'
        };
    }
    if (s.includes('bear') || s.includes('cautious')) {
        return { 
            icon: <TrendingDown className="w-4 h-4 text-red-500" />, 
            textClass: 'text-red-400',
            barClass: 'bg-red-500'
        };
    }
    return { 
        icon: <Minus className="w-4 h-4 text-zinc-500" />, 
        textClass: 'text-zinc-400',
        barClass: 'bg-zinc-500'
    };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-zinc-300">
        <thead className="text-xs text-zinc-500 uppercase bg-zinc-950 border-b border-zinc-800">
          <tr>
            <th className="px-6 py-3">Entity</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Sentiment</th>
            <th className="px-6 py-3 text-right">Relevance</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, index) => {
            const styles = getSentimentStyles(entity.sentiment);
            return (
                <tr key={index} className="bg-transparent border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                    {entity.name}
                    {entity.ticker && <span className="ml-2 text-xs text-black bg-zinc-200 px-1.5 py-0.5 rounded font-bold">{entity.ticker}</span>}
                </td>
                <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs border border-zinc-800 bg-black text-zinc-400">
                        {entity.type}
                    </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                    {styles.icon}
                    <span className={styles.textClass}>{entity.sentiment}</span>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-1 inline-block max-w-[80px]">
                    <div 
                        className={`h-1.5 rounded-full ${styles.barClass}`} 
                        style={{ width: `${entity.relevanceScore}%` }}
                    ></div>
                    </div>
                </td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EntityTable;