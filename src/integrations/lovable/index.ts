// Authentication and backend integration module for Ceasiun
import { supabase } from "@/integrations/supabase/client";

export const authClient = {
  signInWithOAuth: async (provider: "google", options?: { redirect_uri?: string }) => {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: options?.redirect_uri,
      },
    });
  },
};
