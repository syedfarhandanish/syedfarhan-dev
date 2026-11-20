'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';

/** Current time in Pakistan, updated each minute. Renders a placeholder on the server. */
export default function LocalTime() {
  const [time, setTime] = useState<string>('--:--');
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('en-GB', { timeZone: site.timezone, hour: '2-digit', minute: '2-digit' });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <time suppressHydrationWarning>{time}</time>;
}
