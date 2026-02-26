import React, { useState, useEffect } from 'react';
import { Pipette, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { TailwindColorMatch, getContrastColor } from '../utils/colors';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  match: TailwindColorMatch | null;
}

export function ColorPicker({ color, onChange, match }: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(color);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setHexInput(color);
  }, [color]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      onChange(val);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const contrastColor = getContrastColor(color);

  return (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Select Color</h2>
        <div className="relative flex items-center">
          <div className="absolute left-4 w-8 h-8 rounded-full overflow-hidden border border-zinc-200">
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
            />
          </div>
          <input
            type="text"
            value={hexInput}
            onChange={handleInputChange}
            className="w-full pl-16 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
            placeholder="#000000"
          />
          <Pipette className="absolute right-4 text-zinc-400 pointer-events-none" size={20} />
        </div>
      </div>

      {match && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Tailwind Match</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tailwind Class Card */}
            <div 
              className="group relative p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-all cursor-pointer overflow-hidden"
              onClick={() => copyToClipboard(`bg-${match.name}-${match.shade}`, 'tw')}
            >
              <motion.div 
                className="absolute inset-0 opacity-10"
                animate={{ backgroundColor: match.hex }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative z-10 flex flex-col gap-1">
                <span className="text-xs text-zinc-500 font-medium">Class</span>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-semibold text-zinc-900">
                    {match.name}-{match.shade}
                  </span>
                  {copied === 'tw' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-zinc-300 group-hover:text-zinc-600 transition-colors" />}
                </div>
              </div>
            </div>

            {/* Hex Code Card */}
            <div 
              className="group relative p-6 rounded-2xl hover:border-zinc-300 transition-all cursor-pointer"
              onClick={() => copyToClipboard(match.hex, 'hex')}
            >
              <motion.div 
                className="absolute inset-0 rounded-2xl"
                animate={{ backgroundColor: match.hex }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative z-10 flex flex-col gap-1">
                <span className="text-xs font-medium opacity-80" style={{ color: contrastColor }}>Hex</span>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-semibold" style={{ color: contrastColor }}>
                    {match.hex.toUpperCase()}
                  </span>
                  {copied === 'hex' ? <Check size={16} style={{ color: contrastColor }} /> : <Copy size={16} style={{ color: contrastColor, opacity: 0.7 }} className="group-hover:opacity-100 transition-opacity" />}
                </div>
              </div>
            </div>
          </div>
          
          {match.distance > 0 && (
            <p className="text-xs text-zinc-400 mt-2">
              * Closest match found. Distance: {match.distance.toFixed(2)}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
