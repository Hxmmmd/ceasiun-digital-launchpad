"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type CSSProperties,
  type RefObject,
} from "react";
import { cn } from "@/utils/utils";

export type AppBlockTheme = "light" | "dark" | "auto" | "system";

/**
 * Base focus ring class utility
 */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--bjork-accent,#ec5c13)] focus-visible:ring-offset-1 focus-visible:ring-offset-[color:var(--bjork-ring-offset,#080808)]";

/**
 * Root styling container utility
 */
export const blockRoot =
  "relative flex h-full w-full overflow-hidden bg-[var(--bjork-bg,#080808)] text-[var(--bjork-text,#ededed)] font-sans antialiased selection:bg-[var(--bjork-accent-soft,rgba(236,92,19,0.15))] selection:text-[var(--bjork-text-strong,#ffffff)]";

/**
 * Theme hook returning style attribute
 */
export function useAppBlockTheme(theme: AppBlockTheme = "auto") {
  const [currentTheme, setCurrentTheme] = useState<AppBlockTheme>(theme);
  const style: CSSProperties = {};

  return {
    theme: currentTheme,
    setTheme: setCurrentTheme,
    style,
    isDark:
      currentTheme === "dark" ||
      (currentTheme === "auto" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  };
}

/**
 * Measures element width responsively by passing a ref
 */
export function useElementWidth(customRef?: RefObject<HTMLElement | null>): number {
  const internalRef = useRef<HTMLElement | null>(null);
  const targetRef = customRef || internalRef;
  const [width, setWidth] = useState<number>(1200);

  useEffect(() => {
    if (!targetRef.current) return;
    const el = targetRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, [targetRef]);

  return width;
}

/**
 * Accessibility screen-reader announcer hook
 */
export function useAnnouncer() {
  const [message, setMessage] = useState("");

  const announce = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const region = (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );

  return { announce, region };
}

/**
 * Checks prefers-reduced-motion
 */
export function useBlockReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/**
 * Keyboard shortcut badge (Kbd)
 */
export function Kbd({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded border border-[color:var(--bjork-border)] bg-[var(--bjork-surface-muted)] px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--bjork-text-muted)] shadow-xs select-none",
        className
      )}
    >
      {children}
    </kbd>
  );
}

/**
 * Initials Avatar component
 */
export function InitialsAvatar({
  name,
  size = 32,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size, minWidth: size }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-[var(--bjork-accent-soft,rgba(236,92,19,0.15))] text-xs font-semibold text-[var(--bjork-accent,#ec5c13)] border border-[color:var(--bjork-accent-muted,rgba(236,92,19,0.3))] select-none",
        className
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

/**
 * Icon Button component
 */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "ghost" | "surface" | "accent";
  size?: "sm" | "md" | "lg";
  pressed?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, variant = "ghost", size = "md", pressed, className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-7 w-7 p-1 text-xs",
      md: "h-8 w-8 p-1.5 text-sm",
      lg: "h-9 w-9 p-2 text-base",
    }[size];

    const variantClasses = {
      ghost:
        "text-[var(--bjork-text-muted)] hover:bg-[var(--bjork-surface-hover)] hover:text-[var(--bjork-text)]",
      surface:
        "border border-[color:var(--bjork-border)] bg-[var(--bjork-surface)] text-[var(--bjork-text)] hover:bg-[var(--bjork-surface-hover)] shadow-xs",
      accent:
        "bg-[var(--bjork-accent,#ec5c13)] text-[var(--bjork-accent-foreground,#fff)] hover:bg-[var(--bjork-accent-hover,#f07832)] shadow-xs",
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-pressed={pressed}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none",
          focusRing,
          sizeClasses,
          variantClasses,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

/**
 * Standard Block Button component
 */
export interface BlockButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const BlockButton = forwardRef<HTMLButtonElement, BlockButtonProps>(
  ({ variant = "secondary", size = "md", className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-7 px-2.5 text-xs gap-1.5",
      md: "h-8 px-3 text-xs font-medium gap-2",
      lg: "h-9 px-4 text-sm font-medium gap-2.5",
    }[size];

    const variantClasses = {
      primary:
        "bg-[var(--bjork-accent,#ec5c13)] text-[var(--bjork-accent-foreground,#ffffff)] hover:bg-[var(--bjork-accent-hover,#f07832)] shadow-xs border border-transparent",
      secondary:
        "border border-[color:var(--bjork-border)] bg-[var(--bjork-surface)] text-[var(--bjork-text)] hover:bg-[var(--bjork-surface-hover)] shadow-xs",
      ghost:
        "text-[var(--bjork-text-muted)] hover:bg-[var(--bjork-surface-hover)] hover:text-[var(--bjork-text)]",
      destructive:
        "bg-[var(--bjork-error-bg,#130d0a)] text-rose-500 border border-rose-900/40 hover:bg-rose-950/20",
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-colors select-none disabled:opacity-50 disabled:pointer-events-none",
          focusRing,
          sizeClasses,
          variantClasses,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
BlockButton.displayName = "BlockButton";

/**
 * Responsive / Mobile drawer for navigation
 */
export function BlockDrawer({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={label}
      aria-modal="true"
      className="fixed inset-0 z-50 flex"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full w-[280px] max-w-[85vw] flex-col border-r border-[color:var(--bjork-border)] bg-[var(--bjork-panel,#0d0d0d)] shadow-2xl animate-in slide-in-from-left duration-200">
        {children}
      </div>
    </div>
  );
}
