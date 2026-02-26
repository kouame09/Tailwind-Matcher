import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { getContrastColor } from '../utils/colors';

interface EcommerceCardProps {
  color: string;
}

export function EcommerceCard({ color }: EcommerceCardProps) {
  const contrastColor = getContrastColor(color);

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-xl border border-zinc-100">
      {/* Image Container */}
      <div className="relative h-64 bg-zinc-50 p-6 flex items-center justify-center overflow-hidden">
        {/* Decorative background blob */}
        <motion.div 
          className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
          animate={{ backgroundColor: color }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Product Image (Placeholder) */}
        <motion.img 
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000" 
          alt="Premium Headphones"
          className="relative z-10 w-full h-full object-contain drop-shadow-2xl mix-blend-multiply"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Badge */}
        <motion.div 
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide z-20"
          animate={{ backgroundColor: color, color: contrastColor }}
          transition={{ duration: 0.5 }}
        >
          NEW ARRIVAL
        </motion.div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-zinc-400 hover:text-red-500 transition-colors z-20 shadow-sm">
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Aura Studio Pro</h3>
            <p className="text-sm text-zinc-500 mt-1">Wireless Noise-Cancelling</p>
          </div>
          <span className="text-xl font-bold text-zinc-900">$299</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div key={star} animate={{ color: color }} transition={{ duration: 0.5 }}>
              <Star size={16} fill="currentColor" />
            </motion.div>
          ))}
          <span className="text-xs text-zinc-500 ml-2">(128 reviews)</span>
        </div>

        {/* Color Options (Visual only) */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-medium text-zinc-500 mr-2">Color:</span>
          <motion.div 
            className="w-6 h-6 rounded-full border-2 border-white shadow-md ring-1 ring-zinc-200"
            animate={{ backgroundColor: color }}
            transition={{ duration: 0.5 }}
          />
          <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-white shadow-sm" />
          <div className="w-6 h-6 rounded-full bg-zinc-200 border-2 border-white shadow-sm" />
        </div>

        {/* Action Button */}
        <motion.button 
          className="mt-4 w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          animate={{ 
            backgroundColor: color, 
            color: contrastColor,
            boxShadow: `0 10px 25px -5px ${color}66`
          }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag size={18} />
          Add to Cart
        </motion.button>
      </div>
    </div>
  );
}
