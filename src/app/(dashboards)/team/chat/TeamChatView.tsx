"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const TeamChatClient = dynamic(() => import("./TeamChatClient"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-3 text-[color:var(--bjork-text-muted)]">
      <div className="size-8 animate-spin rounded-full border-2 border-[color:var(--bjork-border,#151d2a)] border-t-[color:var(--bjork-accent,#00e5bf)]" />
      <span className="text-sm font-medium">Loading Inbox...</span>
    </div>
  ),
});

export default function TeamChatView() {
  return (
    <div className="team-chat-wrapper">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-3 text-[color:var(--bjork-text-muted)]">
            <div className="size-8 animate-spin rounded-full border-2 border-[color:var(--bjork-border,#151d2a)] border-t-[color:var(--bjork-accent,#00e5bf)]" />
            <span className="text-sm font-medium">Loading Inbox...</span>
          </div>
        }
      >
        <TeamChatClient />
      </Suspense>
    </div>
  );
}
