import React from 'react';
import { Sparkles, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface MotivationCardProps {
  quote: string;
  isLoading?: boolean;
}

export function MotivationCard({ quote, isLoading }: MotivationCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto px-4 my-8"
    >
      <div className="bg-card border border-accent/20 p-8 rounded-2xl relative overflow-hidden group flex items-center gap-6 shadow-sm">
        <div className="w-16 h-16 rounded-full border border-accent/20 flex items-center justify-center shrink-0 bg-accent/5">
          <Quote className="w-6 h-6 text-accent/60" />
        </div>
        <div className="relative z-10 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-2">Pasal Hari Ini</p>
          {isLoading ? (
            <div className="h-12 w-full bg-primary/5 animate-pulse rounded-lg" />
          ) : (
            <p className="text-lg font-serif italic text-primary leading-relaxed">
              "{quote}"
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
