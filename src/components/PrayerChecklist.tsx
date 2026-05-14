import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { PrayerName } from '../types';
import { animate, motion } from 'motion/react';
import { cn } from '../lib/utils';

interface PrayerChecklistProps {
  checks: Record<string, boolean>;
  onToggle: (prayer: PrayerName) => void;
}

const PRAYERS: { name: PrayerName; timeLabel: string }[] = [
  { name: 'Fajr', timeLabel: 'Subuh' },
  { name: 'Dhuhr', timeLabel: 'Dzuhur' },
  { name: 'Asr', timeLabel: 'Ashar' },
  { name: 'Maghrib', timeLabel: 'Maghrib' },
  { name: 'Isha', timeLabel: 'Isya' },
];

export function PrayerChecklist({ checks, onToggle }: PrayerChecklistProps) {
  return (
    <div className="space-y-3 w-full max-w-md mx-auto px-4">
      <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary/60 mb-4 px-2">
        Amalan Hari Ini
      </h2>
      {PRAYERS.map((prayer) => (
        <motion.button
          key={prayer.name}
          whileTap={{ scale: 0.98 }}
          onClick={() => onToggle(prayer.name)}
          className={cn(
            "w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-500",
            checks[prayer.name] 
              ? "bg-accent text-secondary border-accent shadow-xl shadow-accent/10" 
              : "bg-card/50 text-primary border-white/5 hover:border-accent/20 shadow-sm"
          )}
        >
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-xl font-serif italic",
              checks[prayer.name] ? "text-secondary font-bold" : "text-primary opacity-80"
            )}>
              {prayer.timeLabel}
            </span>
          </div>
          {checks[prayer.name] ? (
            <CheckCircle2 className="w-6 h-6 text-secondary" />
          ) : (
            <Circle className="w-6 h-6 text-primary/10" />
          )}
        </motion.button>
      ))}
    </div>
  );
}
