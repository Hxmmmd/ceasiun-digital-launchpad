import "@/CometChat/styles/App.css";
import "@/builder/shell.css";
import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatProvider, CometChatUIKit } from "@cometchat/chat-uikit-react";
import { CometChatHome } from "@/CometChat/components/CometChatHome/CometChatHome";
import CometChatLogin from "@/CometChat/components/CometChatLogin/CometChatLogin";
import { AppContextProvider } from "@/CometChat/context/AppContext";
import { useSettings } from "@/CometChat/config/SettingsContext";
import useSystemColorScheme from "@/builder/customHooks";
import { useBuilderTheme } from "@/builder/useBuilderTheme";

export default function CometChatAppShell() {
  // UI Kit init has already finished before this renders, so the session can be read up front.
  const [loggedInUser, setLoggedInUser] = useState<CometChat.User | null>(
    () => CometChatUIKit.getLoggedInUser() ?? null
  );
  const { style } = useSettings();
  const systemTheme = useSystemColorScheme();

  // The UI Kit accepts only 'light' | 'dark' — resolving 'system' is the consumer's job.
  const theme: "light" | "dark" =
    style.theme === "light" || style.theme === "dark" ? style.theme : systemTheme;

  useBuilderTheme(style, theme);

  useEffect(() => {
    CometChat.addLoginListener(
      "app-login-listener",
      new CometChat.LoginListener({
        loginSuccess: (user: CometChat.User) => setLoggedInUser(user),
        logoutSuccess: () => setLoggedInUser(null),
      })
    );

    return () => CometChat.removeLoginListener("app-login-listener");
  }, []);

  const handleLogout = async () => {
    await CometChatUIKit.logout();
    setLoggedInUser(null);
  };

  return (
    /* The chat UI fills its parent, so give it explicit dimensions. */
    <div className="App" style={{ width: "100vw", height: "100dvh" }}>
      <CometChatProvider theme={theme} locale="en-us">
        <AppContextProvider>
          {loggedInUser ? (
            <CometChatHome loggedInUser={loggedInUser} onLogout={handleLogout} />
          ) : (
            <CometChatLogin onLoginSuccess={setLoggedInUser} />
          )}
        </AppContextProvider>
      </CometChatProvider>
    </div>
  );
}