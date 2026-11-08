"use client";

import { useEffect, useState } from "react";
import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import CometChatAppShell from "./CometChatAppShell";
import { SettingsProvider } from "@/CometChat/config/SettingsContext";
import { builderSettings } from "@/builder/builderSettings";
import { setupLocalization } from "@/builder/localization";

export const COMETCHAT_CONSTANTS = {
  APP_ID: process.env.NEXT_PUBLIC_COMETCHAT_APP_ID || process.env.COMETCHAT_APP_ID || "",
  REGION: process.env.NEXT_PUBLIC_COMETCHAT_REGION || process.env.COMETCHAT_REGION || "", 
  AUTH_KEY: process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY || process.env.COMETCHAT_AUTH_KEY || "", 
};

// Cached so init runs once, even though React Strict Mode runs effects twice in development.
let initPromise: Promise<void> | undefined;

function initCometChat(): Promise<void> {
  if (!initPromise) {
    const uiKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForAllUsers()
      // Without this the call buttons do not render at all.
      .setCallingEnabled(true)
      .build();

    initPromise = Promise.resolve(CometChatUIKit.init(uiKitSettings)).then(() => {
      setupLocalization();
    });
  }
  return initPromise;
}

export default function CometChatNoSSR() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initCometChat()
      .then(() => setReady(true))
      .catch((error) => {
        console.error("CometChat UI Kit failed to initialise:", error);
      });
  }, []);

  if (!ready) return null;

  return (
    <SettingsProvider settings={builderSettings}>
      <CometChatAppShell />
    </SettingsProvider>
  );
}