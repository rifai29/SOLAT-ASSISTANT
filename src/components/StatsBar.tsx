import React from 'react';
import { Flame, Trophy, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsBarProps {
  streak: number;
  total: number;
  completedTodayCount: number;
}

export function StatsBar({ streak, total, completedTodayCount }: StatsBarProps) {
  const progressPercentage = (completedTodayCount / 5) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-2 space-y-4">
      {/* 2-Column Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Streak Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4.5 rounded-3xl border border-primary/5 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
            <Flame className="w-5 h-5 fill-orange-500/10" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted">Hari Beruntun</p>
            <p className="text-xl font-serif font-bold text-primary">{streak} <span className="text-xs font-sans font-medium text-muted">Hari</span></p>
          </div>
        </motion.div>

        {/* Total prayers Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white p-4.5 rounded-3xl border border-primary/5 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="w-11 h-11 rounded-2xl bg-accent/5 flex items-center justify-center text-accent shrink-0">
            <Trophy className="w-5 h-5 fill-accent/10" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted">Total Ibadah</p>
            <p className="text-xl font-serif font-bold text-primary">{total} <span className="text-xs font-sans font-medium text-muted">Poin</span></p>
          </div>
        </motion.div>
      </div>

      {/* Modern Horizontal Today's Completion Tray */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-5 rounded-3xl border border-primary/5 shadow-sm space-y-3"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-xs font-semibold text-primary/80">Progres Hari Ini</span>
          </div>
          <span className="text-xs font-bold text-accent font-mono bg-accent/5 px-2.5 py-1 rounded-full">{completedTodayCount} / 5 Solat</span>
        </div>
        
        {/* Progress Bar Track */}
        <div className="relative w-full h-2.5 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-[#34D399] rounded-full"
          />
        </div>
        <p className="text-[10px] text-muted leading-tight font-medium">
          {completedTodayCount === 5 
            ? "Maa syaa Allah, semua solat fardu hari ini sudah lengkap!" 
            : `${5 - completedTodayCount} solat lagi untuk mempertahankan streak Anda hari ini.`}
        </p>
      </motion.div>
    </div>
  );
}

