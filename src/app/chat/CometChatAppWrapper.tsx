"use client";

import dynamic from "next/dynamic";

const CometChatNoSSR = dynamic(() => import("./CometChatNoSSR/CometChatNoSSR"), {
  ssr: false,
});

export default function CometChatAppWrapper() {
  return <CometChatNoSSR />;
}