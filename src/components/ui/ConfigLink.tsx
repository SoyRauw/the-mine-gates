import type { MouseEvent, ReactNode } from "react";
import { isConfigured } from "../../data/config";
import { useToast } from "./toast-context";

export function ConfigLink({
  href,
  placeholder,
  className,
  children,
  external = true,
  ariaLabel,
  onNavigate,
}: {
  href: string;
  placeholder: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  ariaLabel?: string;
  onNavigate?: () => void;
}) {
  const { showToast } = useToast();
  const configured = isConfigured(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!configured) {
      event.preventDefault();
      showToast(placeholder);
      return;
    }
    onNavigate?.();
  };

  return (
    <a
      className={className}
      href={configured ? href : "#"}
      target={configured && external ? "_blank" : undefined}
      rel={configured && external ? "noreferrer noopener" : undefined}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
