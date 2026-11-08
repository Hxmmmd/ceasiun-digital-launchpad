import "./styles.css";
import { AppDashboardShell } from "./TeamDashboardShell";

export const metadata = {
  title: "Team Dashboard | Ceasiun",
  description: "Ceasiun Team Dashboard and Workspace",
};

export default function TeamDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-[var(--bjork-bg,#111111)] text-[color:var(--bjork-text,#ededed)]">
      <AppDashboardShell>{children}</AppDashboardShell>
    </div>
  );
}

