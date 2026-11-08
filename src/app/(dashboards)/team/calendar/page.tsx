import TeamCalendarView from "./TeamCalendarView";

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="font-bjork-display text-[24px] font-bold italic leading-none tracking-[-0.02em] @3xl:text-[28px] text-[color:var(--bjork-text)]">
            Calendar
          </h1>
          <p className="mt-2 text-[13px] text-[color:var(--bjork-text-muted)]">
            Schedule meetings, events, and track team deadlines in one place
          </p>
        </div>
      </div>
      <TeamCalendarView />
    </div>
  );
}

