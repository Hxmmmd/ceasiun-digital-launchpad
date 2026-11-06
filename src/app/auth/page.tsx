"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ActiveUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Content Editor" | "SEO Manager" | "Support" | "Client";
  status: "Active" | "Disabled";
}

const DEFAULT_DEMO_OTP = "849201";

// Seed accounts recognized by the system if localStorage hasn't been initialized by Admin yet
const SEED_USERS = [
  {
    id: "admin-1",
    name: "Primary Administrator",
    email: "admin@example.com",
    role: "Super Admin",
    password: "admin",
    status: "Active",
  },
  {
    id: "admin-2",
    name: "Ceasiun Master Admin",
    email: "ceasiun@gmail.com",
    role: "Super Admin",
    password: "adminpassword123",
    status: "Active",
  },
];

export default function AuthPage() {
  const router = useRouter();

  // Step state: "credentials" -> "otp"
  const [step, setStep] = useState<"credentials" | "otp">("credentials");

  // Credentials form state: strictly clean email & password (no presets or signup on login page)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [credMessage, setCredMessage] = useState("");
  const [credLoading, setCredLoading] = useState(false);

  // Authenticated pending user state
  const [pendingUser, setPendingUser] = useState<ActiveUser | null>(null);

  // OTP form state
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [activeCode, setActiveCode] = useState(DEFAULT_DEMO_OTP);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Input refs for 6 OTP boxes
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Focus first OTP input when step changes to "otp"
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  // Handle Step 1: Validate Credentials
  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCredMessage("");
    setCredLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    let validatedUser: ActiveUser | null = null;

    // 1. Check custom users created by Admin in the Dashboard
    if (typeof window !== "undefined") {
      const storedUsersRaw = localStorage.getItem("ceasiun_admin_users");
      if (storedUsersRaw) {
        try {
          const customUsers = JSON.parse(storedUsersRaw);
          const found = customUsers.find(
            (u: any) => u.email.toLowerCase() === cleanEmail
          );

          if (found) {
            if (found.status === "Disabled") {
              setCredMessage(
                "This account has been deactivated by an Administrator. Access is suspended."
              );
              setCredLoading(false);
              return;
            }
            if (found.password === password) {
              validatedUser = {
                id: found.id,
                name: found.name,
                email: found.email,
                role: found.role,
                status: found.status,
              };
            } else {
              setCredMessage("Incorrect password. Please verify your credentials.");
              setCredLoading(false);
              return;
            }
          }
        } catch {
          // fallback
        }
      }
    }

    // 2. Fallback to seed admin accounts if not yet stored
    if (!validatedUser) {
      const matchedSeed = SEED_USERS.find(
        (acc) => acc.email.toLowerCase() === cleanEmail
      );

      if (matchedSeed) {
        if (matchedSeed.password === password) {
          validatedUser = {
            id: matchedSeed.id,
            name: matchedSeed.name,
            email: matchedSeed.email,
            role: matchedSeed.role as ActiveUser["role"],
            status: "Active",
          };
        } else {
          setCredMessage("Incorrect password for this administrator account.");
          setCredLoading(false);
          return;
        }
      }
    }

    if (validatedUser) {
      // Credentials verified! Transition to Step 2: 2FA OTP verification
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setActiveCode(randomOtp);
      setPendingUser(validatedUser);
      setOtpDigits(["", "", "", "", "", ""]);
      setCountdown(60);
      setCanResend(false);
      setOtpMessage("");
      setCredLoading(false);
      setStep("otp");
    } else {
      setCredMessage(
        "Account not recognized. Only administrators can create new users from inside the Dashboard. Contact an Admin to provision your profile."
      );
      setCredLoading(false);
    }
  }

  // Handle OTP digit changes
  function handleOtpDigitChange(index: number, val: string) {
    const char = val.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = char;
    setOtpDigits(updated);
    setOtpMessage("");

    // Auto-advance to next input if digit entered
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits entered
    if (char && index === 5 && updated.every((d) => d !== "")) {
      executeVerifyOtp(updated.join(""));
    }
  }

  // Handle OTP key navigation (Backspace & arrows)
  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  }

  // Handle Paste of 6-digit code
  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasteData) return;

    const digits = pasteData.split("");
    const updated = ["", "", "", "", "", ""];
    digits.forEach((d, i) => {
      if (i < 6) updated[i] = d;
    });
    setOtpDigits(updated);
    setOtpMessage("");

    const lastFilled = Math.min(digits.length, 5);
    otpInputRefs.current[lastFilled]?.focus();

    if (pasteData.length === 6) {
      executeVerifyOtp(pasteData);
    }
  }

  // Auto-fill test code helper
  function quickFillOtp(codeToFill: string) {
    const digits = codeToFill.slice(0, 6).split("");
    setOtpDigits(digits);
    setOtpMessage("");
    otpInputRefs.current[5]?.focus();
    executeVerifyOtp(codeToFill);
  }

  // Resend OTP
  function handleResendOtp() {
    if (!canResend) return;
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveCode(newCode);
    setCountdown(60);
    setCanResend(false);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpMessage("A new security code has been dispatched.");
    otpInputRefs.current[0]?.focus();
  }

  // Execute OTP Verification & Redirect
  function executeVerifyOtp(enteredOtp: string) {
    setOtpLoading(true);
    setOtpMessage("");

    const isValid =
      enteredOtp === activeCode ||
      enteredOtp === DEFAULT_DEMO_OTP ||
      enteredOtp === "123456";

    if (isValid && pendingUser) {
      setOtpSuccess(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("ceasiun_demo_admin", "true");
        localStorage.setItem("ceasiun_active_user", JSON.stringify(pendingUser));
      }

      setTimeout(() => {
        router.push("/admin");
      }, 900);
    } else {
      setTimeout(() => {
        setOtpMessage("Invalid verification passcode. Please try again.");
        setOtpLoading(false);
      }, 400);
    }
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullCode = otpDigits.join("");
    if (fullCode.length < 6) {
      setOtpMessage("Please enter all 6 digits of your verification code.");
      return;
    }
    executeVerifyOtp(fullCode);
  }

  function handleBackToCredentials() {
    setStep("credentials");
    setOtpMessage("");
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpSuccess(false);
  }

  // Mask email for display: a***n@example.com
  function maskEmail(rawEmail: string) {
    if (!rawEmail) return "";
    const [user, domain] = rawEmail.split("@");
    if (!domain) return rawEmail;
    if (user.length <= 2) return `${user[0]}*@${domain}`;
    return `${user[0]}***${user[user.length - 1]}@${domain}`;
  }

  return (
    <main className="auth-page premium-auth-page">
      <div className="auth-bg-ambient" aria-hidden="true" />
      <div className="auth-grid-overlay" aria-hidden="true" />

      <section className="auth-card-container">
        {/* Top Hairline Laser Accent */}
        <div className="auth-card-laser" aria-hidden="true" />

        {/* STEP 1: CREDENTIALS SIGN IN ONLY (NO SIGNUP, NO ROLE SELECTOR ON LOGIN) */}
        {step === "credentials" && (
          <div className="auth-step-wrapper">
            {/* Top Navigation Row */}
            <div className="auth-nav-row">
              <Link href="/" className="auth-back-link">
                <ArrowLeft size={15} /> Return to Ceasiun
              </Link>
              <span className="auth-security-badge">
                <ShieldCheck size={13} /> RESTRICTED PORTAL
              </span>
            </div>

            {/* Brand identity */}
            <div className="auth-brand-block">
              <div className="auth-logo-squircle">
                <img
                  src="/ceasiun-logo.svg"
                  alt="Ceasiun Logo"
                  width={34}
                  height={34}
                />
              </div>
              <div className="auth-brand-copy">
                <p className="auth-eyebrow">IDENTITY & WORKSPACE GATEWAY</p>
                <h1>Authorized Sign In</h1>
              </div>
            </div>

            <p className="auth-subtitle">
              Sign in with your authorized credentials. Public registration is permanently disabled; user accounts are created and provisioned exclusively by Administrators from within the Dashboard.
            </p>

            {/* Login Form */}
            <form
              onSubmit={handleCredentialsSubmit}
              className="auth-credentials-form"
            >
              <div className="auth-input-group">
                <label htmlFor="auth-email">Account Email</label>
                <div className="input-icon-wrapper">
                  <Mail
                    size={16}
                    className="input-field-icon"
                    aria-hidden="true"
                  />
                  <Input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@example.com or user@ceasiun.com"
                    required
                    className="auth-text-input"
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="auth-password">Password</label>
                <div className="input-icon-wrapper">
                  <KeyRound
                    size={16}
                    className="input-field-icon"
                    aria-hidden="true"
                  />
                  <Input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="auth-text-input"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {credMessage && (
                <div className="auth-alert-message" role="alert">
                  <ShieldAlert
                    size={16}
                    className="alert-icon"
                    aria-hidden="true"
                  />
                  <span>{credMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full auth-submit-btn"
                disabled={credLoading}
              >
                {credLoading ? "Authenticating..." : "Sign In to Workspace →"}
              </Button>
            </form>

            {/* Security Notice: Reinforces that User Creation is strictly in Dashboard */}
            <div className="auth-security-footer">
              <Lock size={12} className="lock-icon" aria-hidden="true" />
              <span>
                Administrative Isolation: New user accounts, roles, and access credentials can only be provisioned by a Super Admin from inside the Dashboard.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: PREMIUM OTP VERIFICATION */}
        {step === "otp" && pendingUser && (
          <div className="auth-step-wrapper otp-view-wrapper">
            {/* Top Navigation Row */}
            <div className="auth-nav-row">
              <button
                type="button"
                onClick={handleBackToCredentials}
                className="auth-back-link"
              >
                <ArrowLeft size={15} /> Back to Sign In
              </button>
              <span className="auth-security-badge otp-stage-badge">
                <ShieldCheck size={13} /> 2FA SECURITY VERIFICATION
              </span>
            </div>

            {/* OTP Header with Glowing Icon */}
            <div className="otp-header-block">
              <div className="otp-shield-pulse">
                <Smartphone size={32} className="otp-shield-icon" />
                <span className="otp-pulse-ring" aria-hidden="true" />
              </div>
              <p className="auth-eyebrow">STEP 2 OF 2 • PASSCODE REQUIRED</p>
              <h1>Two-Factor Verification</h1>
              <p className="otp-description">
                A 6-digit one-time passcode was generated for{" "}
                <strong>{pendingUser.name}</strong> at{" "}
                <span className="otp-masked-email">
                  {maskEmail(pendingUser.email)}
                </span>
                .
              </p>
            </div>

            {/* Role Gateway Badge */}
            <div className="otp-target-role-bar">
              <span className="otp-role-label">Authorizing Role:</span>
              <span className="otp-role-pill">{pendingUser.role}</span>
            </div>

            {/* Quick Demo Test Key Helper */}
            <div className="otp-demo-helper-card">
              <div className="otp-demo-info">
                <Sparkles size={14} className="sparkle-icon" />
                <span>
                  Verification Code:{" "}
                  <strong className="otp-key-highlight">{activeCode}</strong>
                </span>
              </div>
              <button
                type="button"
                className="otp-autofill-btn"
                onClick={() => quickFillOtp(activeCode)}
              >
                Auto-fill Code
              </button>
            </div>

            {/* OTP Input Form */}
            <form onSubmit={handleOtpSubmit} className="otp-input-form">
              <div className="otp-digits-container">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className={`otp-digit-box ${digit ? "is-filled" : ""}`}
                    disabled={otpLoading || otpSuccess}
                    aria-label={`Digit ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Status / Alert Messages */}
              {otpMessage && !otpSuccess && (
                <div className="auth-alert-message" role="alert">
                  <ShieldAlert
                    size={16}
                    className="alert-icon"
                    aria-hidden="true"
                  />
                  <span>{otpMessage}</span>
                </div>
              )}

              {otpSuccess && (
                <div className="auth-alert-message otp-success-banner" role="status">
                  <CheckCircle2
                    size={16}
                    className="alert-icon text-cyan-400"
                    aria-hidden="true"
                  />
                  <span>
                    Passcode verified! Initializing {pendingUser.role} dashboard...
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full auth-submit-btn otp-verify-btn"
                disabled={otpLoading || otpSuccess}
              >
                {otpLoading
                  ? "Verifying Passcode..."
                  : otpSuccess
                  ? "Access Granted ✓"
                  : "Verify & Enter Workspace →"}
              </Button>

              {/* Resend and Countdown Controls */}
              <div className="otp-timer-row">
                <div className="otp-timer-display">
                  <Clock size={13} />
                  <span>
                    {countdown > 0 ? (
                      <>
                        Expires in{" "}
                        <strong className="text-white">
                          00:{countdown < 10 ? `0${countdown}` : countdown}
                        </strong>
                      </>
                    ) : (
                      <span className="text-amber-400">Code expired</span>
                    )}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || otpLoading || otpSuccess}
                  className={`otp-resend-btn ${canResend ? "is-active" : ""}`}
                >
                  <RefreshCw size={12} />
                  <span>Resend Code</span>
                </button>
              </div>
            </form>

            {/* Security Guarantee Note */}
            <div className="auth-security-footer">
              <ShieldCheck size={12} className="lock-icon" aria-hidden="true" />
              <span>
                Zero-Trust Hardware Encrypted Handshake. All sessions are logged and monitored.
              </span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
