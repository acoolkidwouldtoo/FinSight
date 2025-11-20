import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SentimentGaugeProps {
  score: number;
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ score }) => {
  const normalizedScore = Math.max(-100, Math.min(100, score));
  
  const data = [
    { name: 'Bearish', value: 33, color: '#ef4444' }, // Red
    { name: 'Neutral', value: 33, color: '#3f3f46' }, // Zinc 700
    { name: 'Bullish', value: 34, color: '#10b981' }, // Emerald
  ];

  // Needle Rotation
  // -100 = -90deg, 0 = 0deg, 100 = 90deg
  const rotation = (normalizedScore / 100) * 90;

  const getScoreColorClass = () => {
    if (score > 10) return 'text-emerald-500';
    if (score < -10) return 'text-red-500';
    return 'text-white';
  };

  // Fixed Pixel Geometry for h-64 (256px) container
  // Using pixels guarantees HTML/SVG alignment better than percentages
  const HEIGHT = 256;
  const CENTER_Y = 190; // Position pivot 190px from top (approx 74%)
  const NEEDLE_BOTTOM_PX = HEIGHT - CENTER_Y; // 66px from bottom
  
  const INNER_RADIUS = 105;
  const OUTER_RADIUS = 145;

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden select-none">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy={CENTER_Y}
            startAngle={180}
            endAngle={0}
            innerRadius={INNER_RADIUS}
            outerRadius={OUTER_RADIUS}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Score Text - Positioned explicitly relative to the needle pivot */}
      <div 
        className="absolute w-full text-center z-10 flex flex-col items-center" 
        style={{ bottom: `${NEEDLE_BOTTOM_PX + 35}px` }} // 35px gap above the pivot
      >
        <span className={`text-5xl font-bold tracking-tighter tabular-nums drop-shadow-lg ${getScoreColorClass()}`}>
            {score > 0 ? '+' : ''}{score}
        </span>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 opacity-80">Sentiment Score</p>
      </div>

      {/* Needle Assembly */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Needle */}
        <div 
            className="absolute left-1/2 w-1 bg-white origin-bottom shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 transition-transform duration-1000 ease-out"
            style={{ 
                height: `${INNER_RADIUS - 10}px`, // Slightly shorter than inner radius
                bottom: `${NEEDLE_BOTTOM_PX}px`, 
                marginLeft: '-2px', 
                transform: `rotate(${rotation}deg)`
            }}
        />
        {/* Pivot Dot */}
        <div 
            className="absolute left-1/2 w-6 h-6 bg-white rounded-full border-[4px] border-zinc-950 shadow-xl z-30"
            style={{ 
                bottom: `${NEEDLE_BOTTOM_PX - 12}px`, // Center vertically on the pivot point (radius 12)
                marginLeft: '-12px'
            }} 
        />
      </div>
    </div>
  );
};

export default SentimentGauge;