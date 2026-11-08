'use client';

import { useState } from 'react';
import { Scheduler, type CalendarEvent } from 'calendarkit-pro';
import 'calendarkit-pro/styles.css';
import './calendar.css';

export default function TeamCalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "demo-event-1",
      title: "Design Sprint: Ceasiun V2",
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 30, 0, 0)),
      description: "Review UI components and responsive layouts for team dashboard.",
    },
    {
      id: "demo-event-2",
      title: "Weekly Engineering Sync",
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0, 0)),
      description: "Discuss Next.js App Router migrations and performance.",
    },
  ]);

  return (
    <div className="team-calendar-wrapper flex-1 min-h-[680px] h-full w-full rounded-[14px] border border-[color:var(--bjork-border,#232323)] bg-[var(--bjork-surface,#121212)] p-2 @3xl:p-3 shadow-[var(--bjork-shadow-surface)]">
      <Scheduler
        theme={{
          preset: "calm",
          colors: {
            primary: "var(--bjork-accent, #ec5c13)",
            primaryForeground: "var(--bjork-accent-foreground, #fff2ea)",
            background: "var(--bjork-surface, #121212)",
            foreground: "var(--bjork-text, #ededed)",
            border: "var(--bjork-border, #232323)",
            muted: "var(--bjork-panel, #0d0d0d)",
            mutedForeground: "var(--bjork-text-muted, rgba(237, 237, 237, 0.6))",
            accent: "var(--bjork-surface-hover, #161616)",
            ring: "var(--bjork-accent, #ec5c13)",
          },
          borderRadius: "10px",
        }}
        mode="dark"
        events={events}
        onEventCreate={(event) =>
          setEvents((list) => [...list, { ...event, id: crypto.randomUUID() } as CalendarEvent])
        }
        onEventUpdate={(event) =>
          setEvents((list) => list.map((e) => (e.id === event.id ? event : e)))
        }
        onEventDelete={(id) =>
          setEvents((list) => list.filter((e) => e.id !== id))
        }
      />
    </div>
  );
}

