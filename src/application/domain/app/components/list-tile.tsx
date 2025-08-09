import { Button } from "@/application/shared/components/ui/button";
import { Icon, type IconProps } from "@/application/shared/components/ui/icon";
import { cn } from "@/application/shared/lib/utils";
import { useUpdateSentenceFavorite } from "../pages/sentences/hooks/use-update-sentence-favorite";
import { useUpdateCategoryFavorite } from "../pages/categories/hooks/use-update-category-favorite";
import { ProtectedComponent } from "./protected-component";
import { Colors } from "./colors-map";

type Props = {
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  title: string;
  subtitle: string;
  sentenceId?: string;
  isFavorite?: boolean;
  color?: string;
  icon?: IconProps["name"];
  categoryId?: string;
}

export function ListTile({ 
  size = "sm", 
  onClick, 
  title, 
  subtitle, 
  sentenceId, 
  isFavorite, 
  color, 
  icon,
  categoryId
}: Props) {
  const sizes = {
    sm: {
      div: "size-6",
      icon: "size-3",
    },
    md: {
      div: "size-8",
      icon: "size-4",
    },
    lg: {
      div: "size-10",
      icon: "size-6",
    },
  }

  const { updateSentenceFavorite } = useUpdateSentenceFavorite();
  const { updateCategoryFavorite } = useUpdateCategoryFavorite();

  const heartColor = isFavorite ? "text-red-500" : undefined;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (sentenceId) {
      void updateSentenceFavorite({ dto: { isFavorite: !isFavorite }, sentenceId });
    } else if (categoryId) {
      void updateCategoryFavorite({ dto: { isFavorite: !isFavorite }, categoryId });
    }
  };

  return (
    <div className="flex items-center gap-2 w-full border border-solid border-border rounded-lg p-4" onClick={onClick}>
      <div 
        className={cn("flex items-center justify-center rounded size-6", sizes[size].div)}
        style={{ backgroundColor: `${color}2a` }}
      >
        <Icon name={icon ?? 'badge-question-mark'} className={cn("text-white", sizes[size].icon)} color={color ?? Colors.Azul} />
      </div>
      <div className="flex flex-col flex-1">
        <strong>{title}</strong>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>

      <div className="flex justify-end items-center">
        <ProtectedComponent>
          <Button variant="ghost" size="icon" onClick={handleToggleFavorite} aria-label={isFavorite ? "Desfavoritar" : "Favoritar"}>
            <Icon name="heart" fill={isFavorite ? "currentColor" : "none"} className={cn("size-6", heartColor)} />
          </Button>
        </ProtectedComponent>
        <Icon name="chevron-right" className="size-6" />
      </div>
    </div>
  )
}