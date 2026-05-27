import React from 'react';
import { Moon, MapPin, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface HeaderProps {
  location: string;
}

export function Header({ location }: HeaderProps) {
  const date = new Date();
  
  return (
    <div className="pt-10 pb-6 px-2 md:px-0 flex flex-col items-start w-full">
      {/* Premium Minimalist Islamic Emblem */}
      <div className="relative mb-3 flex items-center justify-start">
        <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full w-12 h-12 -z-10 animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-white border border-accent/20 flex items-center justify-center shadow-sm">
          <Moon className="w-5 h-5 text-accent animate-pulse fill-accent/10" />
        </div>
      </div>

      <h1 className="text-3xl font-serif font-semibold tracking-wide text-primary flex items-center gap-1.5">
        Qalbu <span className="text-accent italic font-normal">Aide</span>
      </h1>
      
      <p className="text-muted text-[10px] uppercase tracking-[0.25em] font-medium mt-1 mb-6 flex items-center gap-1 text-left">
        <Sparkles className="w-3 h-3 text-gold" />
        NURANI DALAM SETIAP SUJUD
      </p>

      {/* Date & Location Pill Container */}
      <div className="flex gap-4 items-center bg-white shadow-sm hover:shadow-md transition-shadow duration-350 px-5 py-2.5 rounded-2xl border border-primary/5 w-full max-w-md justify-start">
        <div className="flex items-center gap-2 text-[11px] font-medium text-muted">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span className="text-primary truncate max-w-[120px]">{location}</span>
        </div>
        <div className="w-[1.5px] h-3.5 bg-primary/10" />
        <div className="flex items-center gap-2 text-[11px] font-medium text-muted">
          <CalendarIcon className="w-3.5 h-3.5 text-accent" />
          <span className="text-primary">{format(date, 'EEEE, d MMMM', { locale: id })}</span>
        </div>
      </div>
    </div>
  );
}

