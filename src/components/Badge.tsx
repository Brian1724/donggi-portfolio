import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-primary-pale px-3 py-1 text-sm font-semibold leading-5 text-positive-deep">
      {children}
    </span>
  );
}
