import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "blue" | "dim";
}

export function Tag({ children, className, variant = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] tracking-wide",
        variant === "default" &&
          "border border-sf-border bg-sf-black-3 text-sf-white-faint",
        variant === "blue" &&
          "border border-sf-blue/30 bg-sf-blue-glow text-sf-blue",
        variant === "dim" && "border border-sf-border bg-sf-black-2 text-sf-white-faint",
        className
      )}
    >
      {children}
    </span>
  );
}
