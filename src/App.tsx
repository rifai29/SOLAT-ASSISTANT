/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PrayerChecklist } from './components/PrayerChecklist';
import { StatsBar } from './components/StatsBar';
import { MotivationCard } from './components/MotivationCard';
import { PrayerTimesList } from './components/PrayerTimesList';
import { getPrayerTimes, getCityName } from './services/prayerService';
import { getMotivationalQuote } from './services/geminiService';
import { PrayerName, PrayerTimes, UserStats, DayProgress } from './types';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';

export default function App() {
  const [location, setLocation] = useState<string>('Memuat Lokasi...');
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState<UserStats>({ streak: 0, totalPoints: 0, lastUpdated: '' });
  const [quote, setQuote] = useState<string>('');
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // ... (rest of logic same until handleToggle)

  useEffect(() => {
    const savedStats = localStorage.getItem('qalbu_stats');
    if (savedStats) setStats(JSON.parse(savedStats));

    const savedDay = localStorage.getItem(`qalbu_day_${todayStr}`);
    if (savedDay) {
      setChecks(JSON.parse(savedDay));
    } else {
      setChecks({ Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false });
    }
  }, [todayStr]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ lat, lon });
          try {
            const [times, city] = await Promise.all([
              getPrayerTimes(lat, lon),
              getCityName(lat, lon)
            ]);
            setPrayerTimes(times);
            setLocation(city);
          } catch (err) {
            setLocation('Gagal memuat jadwal');
          }
        },
        () => setLocation('Akses lokasi ditolak')
      );
    }
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoadingQuote(true);
      const res = await getMotivationalQuote(stats.streak, false);
      setQuote(res);
      setIsLoadingQuote(false);
    };
    fetchQuote();
  }, [stats.streak]);

  const handleRefreshQuote = async () => {
    setIsLoadingQuote(true);
    const res = await getMotivationalQuote(stats.streak, true);
    setQuote(res);
    setIsLoadingQuote(false);
  };

  const handleToggle = (prayer: PrayerName) => {
    const newChecks = { ...checks, [prayer]: !checks[prayer] };
    setChecks(newChecks);
    localStorage.setItem(`qalbu_day_${todayStr}`, JSON.stringify(newChecks));

    const newTotal = stats.totalPoints + (newChecks[prayer] ? 1 : -1);
    let newStreak = stats.streak;
    let newLastUpdated = stats.lastUpdated;
    
    const allDone = Object.values(newChecks).every(v => v);
    if (allDone && stats.lastUpdated !== todayStr) {
      newStreak += 1;
      newLastUpdated = todayStr;
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    } else if (!allDone && stats.lastUpdated === todayStr) {
      newStreak = Math.max(0, newStreak - 1);
      newLastUpdated = '';
    }

    const newStats = { streak: newStreak, totalPoints: Math.max(0, newTotal), lastUpdated: newLastUpdated };
    setStats(newStats);
    localStorage.setItem('qalbu_stats', JSON.stringify(newStats));
  };

  const completedTodayCount = Object.values(checks).filter(Boolean).length;

  return (
    <div className="w-full min-h-screen bg-secondary overflow-x-hidden relative">
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-accent text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 border border-black/5">
              <Star className="w-6 h-6 fill-current animate-spin text-gold" />
              <div className="font-serif font-bold text-xl italic tracking-wide">Alhamdulillah, Ibadah Selesai!</div>
              <Star className="w-6 h-6 fill-current animate-spin text-gold" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-12">
        <Header location={location} />
        
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-4">
          {/* A magnificent responsive layout: 1 column on mobile, 2 columns on medium, 3 columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* COLUMN 1: Daily Stats & Spiritual Motivation (lg:col-span-4) */}
            <div className="md:col-span-1 lg:col-span-4 space-y-6">
              <StatsBar streak={stats.streak} total={stats.totalPoints} completedTodayCount={completedTodayCount} />
              <MotivationCard quote={quote} isLoading={isLoadingQuote} onRefresh={handleRefreshQuote} />
            </div>

            {/* COLUMN 2: Today's Central Checklist (lg:col-span-4) */}
            <div className="md:col-span-1 lg:col-span-4 space-y-6">
              <PrayerChecklist checks={checks} onToggle={handleToggle} />
            </div>

            {/* COLUMN 3: Prayer Times Watch & Live Guidance Widget (md:col-span-2 lg:col-span-4) */}
            <div className="md:col-span-2 lg:col-span-4 space-y-6">
              <PrayerTimesList times={prayerTimes} />
              
              {/* Premium Interactive Guidance Card - Completes the beautiful widescreen balance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-3xl border border-primary/5 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted">Amanat Qalbu</span>
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-muted leading-relaxed">
                    Setiap hela napas dan detak jantung adalah anugerah tiada tara. Gunakan Qalbu Aide untuk senantiasa mengiringi perjalanan spiritual Anda sehari-hari agar lebih tenang, tertata, dan berkah.
                  </p>
                  <div className="pt-2 border-t border-primary/5 flex items-center justify-between text-[9px] font-mono text-accent uppercase tracking-widest font-semibold">
                    <span>#MuhasabahDiri</span>
                    <span>Istiqomah</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </main>

        <footer className="text-center mt-16 py-6 text-[10px] uppercase tracking-widest font-bold text-primary/30 font-sans">
          Qalbu Ritual Companion • 2026
        </footer>
      </div>
    </div>
  );
}
