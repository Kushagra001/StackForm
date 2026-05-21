"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyEmailProps {
  email?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CopyEmail({
  email = "hello@stack-form.dev",
  className,
  style,
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group flex items-center gap-1.5 text-sm text-sf-white-dim",
        "transition-colors duration-200 hover:text-sf-white font-medium",
        className
      )}
      style={style}
      title="Click to copy email"
    >
      <span className="font-mono">{copied ? "Copied!" : email}</span>
      {copied ? (
        <Check size={13} className="text-green-400" />
      ) : (
        <Copy
          size={13}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </button>
  );
}
