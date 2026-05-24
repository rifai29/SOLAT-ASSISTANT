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

      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 pb-12">
        <Header location={location} />
        
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start max-w-md md:max-w-none mx-auto">
            {/* Actionable items: Stats, Checklist */}
            <div className="space-y-6">
              <StatsBar streak={stats.streak} total={stats.totalPoints} completedTodayCount={completedTodayCount} />
              <PrayerChecklist checks={checks} onToggle={handleToggle} />
            </div>

            {/* Information & Inspiration: Motivation, Prayer Times */}
            <div className="space-y-6">
              <MotivationCard quote={quote} isLoading={isLoadingQuote} onRefresh={handleRefreshQuote} />
              <PrayerTimesList times={prayerTimes} />
            </div>
          </div>
        </main>

        <footer className="text-center mt-12 py-6 text-[10px] uppercase tracking-widest font-bold text-primary/30 font-sans">
          Qalbu Ritual Companion • 2026
        </footer>
      </div>
    </div>
  );
}
