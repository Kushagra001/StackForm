"use client";

import { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer state updates to avoid synchronous setState in effect
    const t = setTimeout(() => {
      setMounted(true)
      if (sessionStorage.getItem("sf-admin") === "true") {
        setAuthed(true)
      }
    }, 0)
    return () => clearTimeout(t)
  }, []);

  const handleAuth = () => {
    if (pw === process.env.NEXT_PUBLIC_ADMIN_PW) {
      sessionStorage.setItem("sf-admin", "true");
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  if (!mounted) return null;
  if (authed) return <>{children}</>;

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#080810" }}
    >
      <div className="w-full max-w-xs">
        <p
          className="text-sf-blue text-center mb-6 uppercase tracking-widest"
          style={{
            fontSize: "11px",
            fontFamily: "var(--font-jetbrains, monospace)",
          }}
        >
          Stackform Admin
        </p>

        <div className="flex gap-2">
          <input
            id="admin-password"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            placeholder="Password"
            className="flex-1 rounded-lg px-4 py-3 text-sm text-sf-white outline-none transition-colors"
            style={{
              backgroundColor: "#0d0d18",
              border: error
                ? "1px solid #ef4444"
                : "1px solid rgba(240,240,255,0.08)",
            }}
            onFocus={(e) => {
              if (!error) {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#4f6ef7";
              }
            }}
            onBlur={(e) => {
              if (!error) {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "rgba(240,240,255,0.08)";
              }
            }}
          />
          <button
            onClick={handleAuth}
            className="rounded-lg bg-sf-blue px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            →
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mt-3">
            Incorrect password
          </p>
        )}
      </div>
    </div>
  );
}
