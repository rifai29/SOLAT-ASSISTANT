import React from 'react';
import { Clock } from 'lucide-react';
import { PrayerTimes } from '../types';

interface PrayerTimesListProps {
  times: PrayerTimes | null;
}

export function PrayerTimesList({ times }: PrayerTimesListProps) {
  if (!times) return null;

  const relevantTimes = [
    { label: 'Subuh', time: times.Fajr },
    { label: 'Terbit', time: times.Sunrise },
    { label: 'Dzuhur', time: times.Dhuhr },
    { label: 'Ashar', time: times.Asr },
    { label: 'Maghrib', time: times.Maghrib },
    { label: 'Isya', time: times.Isha },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-8 pb-12">
      <div className="flex items-center justify-between px-2 mb-6">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary/60">
          Jadwal Sholat Hari Ini
        </h2>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted">
          <Clock className="w-3 h-3" />
          Waktu Setempat
        </div>
      </div>
      <div className="space-y-4 bg-card p-6 rounded-2xl border border-primary/5 shadow-sm">
        {relevantTimes.map((item) => (
          <div key={item.label} className="flex justify-between items-center group transition-all">
            <span className="font-serif italic text-xl text-primary/80 group-hover:text-accent group-hover:pl-1 transition-all">{item.label}</span>
            <span className="text-lg font-medium text-primary tracking-wider">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
