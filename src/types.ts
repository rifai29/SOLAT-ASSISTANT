export type PrayerName = 'Fajr' | 'Dhuhr'| 'Asr' | 'Maghrib' | 'Isha';

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Sunrise: string;
}

export interface DayProgress {
  date: string; // YYYY-MM-DD
  prayers: Record<PrayerName, boolean>;
}

export interface UserStats {
  streak: number;
  totalPoints: number;
  lastUpdated: string;
}
