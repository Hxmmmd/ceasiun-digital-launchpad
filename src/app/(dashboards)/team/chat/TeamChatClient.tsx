"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { initCometChat } from "@/app/chat/CometChatNoSSR/CometChatNoSSR";
import CometChatAppShell from "@/app/chat/CometChatNoSSR/CometChatAppShell";
import { SettingsProvider } from "@/CometChat/config/SettingsContext";
import { builderSettings } from "@/builder/builderSettings";
import "./chat.css";

export default function TeamChatClient() {
  const [ready, setReady] = useState(false);
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user");
  const nameParam = searchParams.get("name");

  const [targetUser, setTargetUser] = useState<CometChat.User | null>(null);

  useEffect(() => {
    initCometChat()
      .then(() => setReady(true))
      .catch((error) => {
        console.error("CometChat UI Kit failed to initialise in dashboard:", error);
      });
  }, []);

  useEffect(() => {
    if (!ready || !userParam) {
      setTargetUser(null);
      return;
    }

    let isMounted = true;
    CometChat.getUser(userParam)
      .then((user) => {
        if (isMounted) setTargetUser(user);
      })
      .catch(() => {
        // Fallback: instantiate user object with requested UID and name
        const fallbackUser = new CometChat.User(userParam);
        if (nameParam) fallbackUser.setName(nameParam);
        if (isMounted) setTargetUser(fallbackUser);
      });

    return () => {
      isMounted = false;
    };
  }, [ready, userParam, nameParam]);

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-3 text-[color:var(--bjork-text-muted)]">
        <div className="size-8 animate-spin rounded-full border-2 border-[color:var(--bjork-border,#151d2a)] border-t-[color:var(--bjork-accent,#00e5bf)]" />
        <span className="text-sm font-medium">Connecting to Inbox...</span>
      </div>
    );
  }

  return (
    <SettingsProvider settings={builderSettings}>
      <CometChatAppShell
        className="App team-chat-app-container"
        style={{ width: "100%", height: "100%" }}
        targetUser={targetUser}
      />
    </SettingsProvider>
  );
}
