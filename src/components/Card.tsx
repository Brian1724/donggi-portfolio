import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`surface-ring rounded-[24px] bg-canvas p-6 transition duration-300 hover:-translate-y-1 ${className}`}
    >
      {children}
    </article>
  );
}
