import React from 'react';
import { CheckCircle2, Circle, Heart } from 'lucide-react';
import { PrayerName } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface PrayerChecklistProps {
  checks: Record<string, boolean>;
  onToggle: (prayer: PrayerName) => void;
}

const PRAYERS: { name: PrayerName; timeLabel: string; subtitle: string }[] = [
  { name: 'Fajr', timeLabel: 'Subuh', subtitle: 'Awal hari dipenuhi cahaya' },
  { name: 'Dhuhr', timeLabel: 'Dzuhur', subtitle: 'Ketenangan di tengah aktivitas' },
  { name: 'Asr', timeLabel: 'Ashar', subtitle: 'Penyegar jiwa di sore hari' },
  { name: 'Maghrib', timeLabel: 'Maghrib', subtitle: 'Kehangatan senja bersujud' },
  { name: 'Isha', timeLabel: 'Isya', subtitle: 'Penutup hari dengan damai' },
];

export function PrayerChecklist({ checks, onToggle }: PrayerChecklistProps) {
  return (
    <div className="space-y-3 w-full max-w-md mx-auto px-4 mt-6">
      <div className="flex items-center justify-between px-2 mb-2">
        <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted">
          Catat Ibadah Hari Ini
        </h2>
        <span className="text-[10px] uppercase tracking-wider text-accent/80 font-bold flex items-center gap-1 bg-accent/5 px-2.5 py-0.5 rounded-full">
          <Heart className="w-2.5 h-2.5 fill-accent/25" />
          FARDU 5 WAKTU
        </span>
      </div>
      
      <div className="space-y-3">
        {PRAYERS.map((prayer, index) => {
          const isDone = checks[prayer.name];
          return (
            <motion.button
              key={prayer.name}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggle(prayer.name)}
              className={cn(
                "w-full flex items-center justify-between p-4 px-5 rounded-[20px] border transition-all duration-300 text-left select-none",
                isDone 
                  ? "bg-accent/10 border-accent/35 text-primary shadow-sm" 
                  : "bg-white text-primary border-primary/5 hover:border-accent/15 hover:shadow-xs shadow-xs"
              )}
            >
              <div className="flex items-center gap-4">
                {/* Visual Number Indicator */}
                <div className={cn(
                  "w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-colors duration-300",
                  isDone 
                    ? "bg-accent text-white" 
                    : "bg-secondary text-muted"
                )}>
                  {index + 1}
                </div>
                
                <div>
                  <span className={cn(
                    "block text-base font-serif font-bold transition-colors duration-300",
                    isDone ? "text-accent-dark font-black" : "text-primary"
                  )}>
                    {prayer.timeLabel}
                  </span>
                  <span className="block text-[10px] text-muted font-sans font-medium mt-0.5">
                    {prayer.subtitle}
                  </span>
                </div>
              </div>
              
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.div
                      key="checked"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-accent fill-accent/10" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unchecked"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                    >
                      <Circle className="w-6 h-6 text-primary/10 hover:text-accent/35 transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

