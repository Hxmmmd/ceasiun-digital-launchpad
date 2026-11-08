'use client'
import { useState } from 'react';
import { Scheduler, type CalendarEvent } from 'calendarkit-pro';

export default function MyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <Scheduler theme="calm" mode="system"
      events={events}
      onEventCreate={(event) => setEvents((list) => [...list, { ...event, id: crypto.randomUUID() } as CalendarEvent])}
      onEventUpdate={(event) => setEvents((list) => list.map((e) => (e.id === event.id ? event : e)))}
      onEventDelete={(id) => setEvents((list) => list.filter((e) => e.id !== id))}
    />
  );
}