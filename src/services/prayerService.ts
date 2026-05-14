import { PrayerTimes } from '../types';

const ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';

export async function getPrayerTimes(latitude: number, longitude: number): Promise<PrayerTimes> {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);
  
  // Method 2: ISNA for common usage, or 3 for Muslim World League
  const response = await fetch(`${ALADHAN_BASE_URL}/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=3`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch prayer times');
  }
  
  const data = await response.json();
  const timings = data.data.timings;
  
  return {
    Fajr: timings.Fajr,
    Dhuhr: timings.Dhuhr,
    Asr: timings.Asr,
    Maghrib: timings.Maghrib,
    Isha: timings.Isha,
    Imsak: timings.Imsak,
    Sunrise: timings.Sunrise,
  };
}

export async function getCityName(latitude: number, longitude: number): Promise<string> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || data.address.state || 'Unknown Location';
  } catch (error) {
    return 'Unknown Location';
  }
}
