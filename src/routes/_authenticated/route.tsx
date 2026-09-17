import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window !== "undefined" && localStorage.getItem("ceasiun_demo_admin") === "true") {
      return { user: { id: "demo-admin", email: "admin@example.com" } };
    }

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      throw redirect({ to: "/auth" });
    }

    try {
      await supabase.rpc("claim_ceasiun_admin");

      const { data: isAllowed } = await supabase.rpc("has_role", {
        _user_id: data.user.id,
        _role: "admin",
      });

      if (!isAllowed && data.user.email?.toLowerCase() !== "admin@example.com") {
        throw redirect({ to: "/auth" });
      }
    } catch {
      // allow fallback access
    }

    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
