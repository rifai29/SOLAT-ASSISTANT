import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsBarProps {
  streak: number;
  total: number;
}

export function StatsBar({ streak, total }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto px-4 mt-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card backdrop-blur-md p-5 rounded-2xl border border-primary/5 flex flex-col items-center justify-center text-center shadow-sm"
      >
        <p className="text-3xl font-serif italic text-accent mb-1">{streak}</p>
        <p className="text-[10px] uppercase tracking-widest font-bold text-muted">Hari Beruntun</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card backdrop-blur-md p-5 rounded-2xl border border-primary/5 flex flex-col items-center justify-center text-center shadow-sm"
      >
        <p className="text-3xl font-serif italic text-accent mb-1">{total}</p>
        <p className="text-[10px] uppercase tracking-widest font-bold text-muted">Total Ibadah</p>
      </motion.div>
    </div>
  );
}
