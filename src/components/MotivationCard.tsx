import React from 'react';
import { Sparkles, Quote, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';

interface MotivationCardProps {
  quote: string;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function MotivationCard({ quote, isLoading, onRefresh }: MotivationCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto px-4 my-6"
    >
      <div className="bg-white border border-primary/5 p-6.5 rounded-3xl relative overflow-hidden group shadow-sm flex flex-col gap-4">
        {/* Decorative subtle background pattern */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10 w-full">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-accent/10">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Nasihat Hari Ini</span>
          </div>

          {onRefresh && (
            <button 
              onClick={onRefresh}
              disabled={isLoading}
              className="p-1.5 rounded-full hover:bg-secondary active:scale-95 transition-all text-muted hover:text-accent disabled:opacity-50"
              title="Ambil nasihat baru"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-accent' : ''}`} />
            </button>
          )}
        </div>

        <div className="flex gap-4 items-start relative z-10">
          <div className="p-2 bg-secondary rounded-2xl shrink-0 mt-0.5">
            <Quote className="w-5 h-5 text-accent/60 transform rotate-180" />
          </div>
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-2 py-1">
                <div className="h-3.5 bg-secondary animate-pulse rounded-full w-full" />
                <div className="h-3.5 bg-secondary animate-pulse rounded-full w-10/12" />
              </div>
            ) : (
              <p className="text-[15px] font-serif leading-relaxed text-primary italic">
                {quote}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

