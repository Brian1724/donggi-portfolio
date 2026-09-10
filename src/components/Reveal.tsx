import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // Copy never waits for JavaScript or an observer to become readable.
  return (
    <div className={className}>
      {children}
    </div>
  );
}
