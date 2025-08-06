import type { ClassValue } from "clsx";
import { cn } from "../lib/utils";

import ComulibrasLogo from '@/application/assets/logo.png';
import ComulibrasLogoLight from '@/application/assets/logo-light.png';
import { useTheme } from "./theme/use-theme";
import { useMemo } from "react";

interface Props {
  className?: ClassValue[] | ClassValue
}

export function Logo({ className }: Props) {
  const { theme, systemTheme, useSystemTheme } = useTheme();

  const logo = useMemo(() => {
    if (useSystemTheme) {
      return systemTheme === 'dark' ? ComulibrasLogoLight : ComulibrasLogo;
    }

    return theme === 'dark' ? ComulibrasLogoLight : ComulibrasLogo;
  }, [theme, systemTheme, useSystemTheme]);

  return (
    <img src={logo} alt="Logo" className={cn(className)} />
  )
}