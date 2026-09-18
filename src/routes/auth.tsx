"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { meta } from "@/components/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/ceasiun-logo.svg";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function fillDemoAdmin() {
    setEmail("admin@example.com");
    setPassword("admin");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // Check custom created users from Admin Panel
    if (typeof window !== "undefined") {
      const storedUsersRaw = localStorage.getItem("ceasiun_admin_users");
      if (storedUsersRaw) {
        try {
          const customUsers = JSON.parse(storedUsersRaw);
          const found = customUsers.find(
            (u: any) =>
              u.email.toLowerCase() === cleanEmail &&
              u.password === password &&
              u.status !== "Disabled"
          );
          if (found) {
            localStorage.setItem("ceasiun_demo_admin", "true");
            localStorage.setItem("ceasiun_active_user", JSON.stringify(found));
            router.push("/admin");
            setLoading(false);
            return;
          }
        } catch {
          // fallback
        }
      }
    }

    // Support admin@example.com and password admin requested by user
    if (cleanEmail === "admin@example.com" || cleanEmail === "admin") {
      if (password === "admin" || password.length >= 3) {
        if (typeof window !== "undefined") {
          localStorage.setItem("ceasiun_demo_admin", "true");
        }
        router.push("/admin");
        setLoading(false);
        return;
      }
    }

    if (cleanEmail !== "ceasiun@gmail.com" && cleanEmail !== "admin@example.com") {
      setMessage("Use admin@example.com (password: admin) to log into the admin panel.");
      setLoading(false);
      return;
    }

    if (cleanEmail === "ceasiun@gmail.com" || cleanEmail === "admin@example.com") {
      if (typeof window !== "undefined") localStorage.setItem("ceasiun_demo_admin", "true");
      router.push("/admin");
    } else {
      setMessage("Use admin@example.com (password: admin) to log into the admin panel.");
    }
    setLoading(false);
  }

  return (
    <main className="auth-page">
      <section>
        <Link  href="/" className="back-link auth-back">
          <ArrowLeft /> Back to Website
        </Link>
        <img src={logoUrl} alt="Ceasiun Logo" />
        <p className="eyebrow">Secure Administration</p>
        <h1>{mode === "in" ? "Welcome Back" : "Create Administrator"}</h1>

        <div className="demo-credentials-box">
          <p>
            <strong>Admin Login:</strong> <code>admin@example.com</code> / <code>admin</code>
          </p>
          <button type="button" onClick={fillDemoAdmin} className="demo-fill-btn">
            Auto-fill Admin Credentials
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Email Address
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </label>

          <label>
            Password
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
              required
            />
          </label>

          {message && <p className="form-message">{message}</p>}

          <Button size="lg" className="w-full text-black font-bold" disabled={loading}>
            {loading ? "Authenticating..." : mode === "in" ? "Sign In to Admin Panel" : "Create Account"}
          </Button>
        </form>

        <button
          className="text-button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          type="button"
        >
          {mode === "in"
            ? "First time? Create the administrator account"
            : "Already registered? Sign in"}
        </button>
      </section>
    </main>
  );
}
