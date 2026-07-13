import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type PremiumButtonVariant = "primary" | "blue" | "secondary" | "danger";
type PremiumButtonSize = "sm" | "md" | "lg";

type PremiumButtonProps = {
  as?: "button" | "a";
  children: ReactNode;
  className?: string;
  icon?: ReactNode | false;
  iconTone?: "default" | "plain";
  size?: PremiumButtonSize;
  variant?: PremiumButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function PremiumButton({
  as = "button",
  children,
  className = "",
  icon,
  iconTone = "default",
  size = "md",
  variant = "primary",
  type = "button",
  ...props
}: PremiumButtonProps) {
  const hasIcon = icon !== false;
  const buttonClassName = [
    "premium-button",
    `premium-button-${variant}`,
    `premium-button-${size}`,
    `premium-button-icon-${iconTone}`,
    !hasIcon ? "premium-button-no-icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const buttonIcon = icon ?? <ArrowUpRight size={18} strokeWidth={2.5} />;

  const content = (
    <>
      {hasIcon && (
        <span className="premium-button-icon" aria-hidden="true">
          {buttonIcon}
        </span>
      )}
      <span className="premium-button-label">{children}</span>
    </>
  );

  if (as === "a") {
    return (
      <a className={buttonClassName} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClassName} type={type} {...props}>
      {content}
    </button>
  );
}
