

import { Button } from "@/application/shared/components/ui/button";
import { Icon } from "@/application/shared/components/ui/icon";
import { Input } from "@/application/shared/components/ui/input";
import { useNavigate } from "react-router";
import { DrawerMenu } from "./drawer-menu";

type Props = {
  title?: string;
  shouldGoBack?: boolean;
  placeholder?: string;
  hideSearch?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
}

export const Header: React.FC<Props> = ({ title, shouldGoBack = false, placeholder = 'Pesquisar', hideSearch = false, search, onSearchChange }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (shouldGoBack) {
      navigate(-1);
    }
  }

  return (
    <header className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          {shouldGoBack ? (
            <Icon className="size-6" name="chevron-left" />
          ) : (
            <DrawerMenu />
          )}
        </Button>
        <h1 className="text-2xl font-bold">{title || 'ComuLibras'}</h1>
        <div className="size-9" />
      </div>

      {!hideSearch && (
        <Input
          placeholder={placeholder}
          className="h-12"
          leftIcon={<Icon name="search" />}        
          value={search ?? ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      )}
    </header>
  )
};