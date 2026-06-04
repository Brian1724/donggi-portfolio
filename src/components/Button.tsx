import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "deep";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-ink hover:bg-primary-active",
  secondary: "bg-primary-pale text-ink hover:bg-primary-active",
  tertiary: "border border-line bg-canvas text-ink hover:bg-primary-pale",
  deep: "bg-ink-deep text-primary-active hover:bg-ink",
};

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-[24px] px-6 py-3 text-base font-semibold leading-6 transition duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`;

  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
