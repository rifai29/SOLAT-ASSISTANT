import React, { useState, useEffect } from 'react';
import { Clock, Eye } from 'lucide-react';
import { PrayerTimes } from '../types';

interface PrayerTimesListProps {
  times: PrayerTimes | null;
}

export function PrayerTimesList({ times }: PrayerTimesListProps) {
  const [currentMinutesState, setCurrentMinutesState] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentMinutesState(now.getHours() * 60 + now.getMinutes());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  if (!times) return null;

  const relevantTimes = [
    { label: 'Subuh', key: 'Fajr', time: times.Fajr },
    { label: 'Dzuhur', key: 'Dhuhr', time: times.Dhuhr },
    { label: 'Ashar', key: 'Asr', time: times.Asr },
    { label: 'Maghrib', key: 'Maghrib', time: times.Maghrib },
    { label: 'Isya', key: 'Isha', time: times.Isha },
  ];

  const parseTimeToMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    const cleanTime = timeStr.split(' ')[0];
    const [hours, minutes] = cleanTime.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  };

  // Find the next prayer
  let nextPrayerIndex = -1;
  for (let i = 0; i < relevantTimes.length; i++) {
    const prayerMinutes = parseTimeToMinutes(relevantTimes[i].time);
    if (prayerMinutes > currentMinutesState) {
      nextPrayerIndex = i;
      break;
    }
  }
  // If none is greater, the next prayer is Fajr (index 0 of tomorrow)
  if (nextPrayerIndex === -1) {
    nextPrayerIndex = 0;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-2 mb-4">
        <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted">
          Jadwal Sholat Hari Ini
        </h2>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted font-semibold">
          <Clock className="w-3.5 h-3.5 text-accent" />
          Waktu Setempat
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-3xl border border-primary/5 shadow-sm space-y-3.5">
        {relevantTimes.map((item, idx) => {
          const isNext = idx === nextPrayerIndex;
          return (
            <div 
              key={item.label} 
              className={`flex justify-between items-center p-3 rounded-2xl transition-all duration-300 ${
                isNext 
                  ? 'bg-accent/5 border border-accent/20 px-4' 
                  : 'bg-transparent border border-transparent hover:bg-secondary/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`font-serif italic text-lg ${isNext ? 'text-accent font-bold' : 'text-primary/70'}`}>
                  {item.label}
                </span>
                {isNext && (
                  <span className="text-[8px] font-sans font-extrabold uppercase bg-accent text-white px-2 py-0.5 rounded-md tracking-wider animate-pulse">
                    Mendatang
                  </span>
                )}
              </div>
              <span className={`text-base font-semibold tracking-wider font-mono ${isNext ? 'text-accent' : 'text-primary'}`}>
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

