import React from 'react';
import { Moon, Sun, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface HeaderProps {
  location: string;
}

export function Header({ location }: HeaderProps) {
  const date = new Date();
  
  return (
    <div className="pt-8 pb-6 px-4 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-2">
        <Moon className="w-6 h-6 text-accent animate-pulse" />
        <h1 className="text-4xl font-serif italic tracking-wide text-accent">
          Qalbu
        </h1>
        <Sun className="w-6 h-6 text-accent" />
      </div>
      
      <p className="text-muted text-[10px] uppercase tracking-[0.2em] mb-6 opacity-60">
        "Ketenangan Hati dalam Sujud"
      </p>

      <div className="flex gap-4 items-center bg-card shadow-sm px-4 py-2 rounded-full border border-primary/5">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium text-primary/60">
          <MapPin className="w-3.5 h-3.5 text-accent/50" />
          {location}
        </div>
        <div className="w-[1px] h-3 bg-primary/10" />
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium text-primary/60">
          <CalendarIcon className="w-3.5 h-3.5 text-accent/50" />
          {format(date, 'EEEE, d MMMM', { locale: id })}
        </div>
      </div>
    </div>
  );
}
