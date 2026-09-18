import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={className} data-scroll-reveal data-reveal-delay={Math.round(delay * 1000)}>
      {children}
    </div>
  );
}
