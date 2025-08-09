import type { Category } from "@/application/domain/app/pages/categories/services/dto/categories-dto";
import { Button } from "@/application/shared/components/ui/button";
import { Icon } from "@/application/shared/components/ui/icon";
import { cn } from "@/application/shared/lib/utils";
import { emptyCategory } from "@/application/shared/utils/empty-category";
import { useUpdateSentenceFavorite } from "../pages/sentences/hooks/use-update-sentence-favorite";
import { useUpdateCategoryFavorite } from "../pages/categories/hooks/use-update-category-favorite";
import { ProtectedComponent } from "./protected-component";

type Props = {
  category?: Category;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  title: string;
  subtitle: string;
  sentenceId?: string;
  isFavorite?: boolean;
}

export function ListTile({ category = emptyCategory, size = "sm", onClick, title, subtitle, sentenceId, isFavorite }: Props) {
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
    } else if (category?.id) {
      void updateCategoryFavorite({ dto: { isFavorite: !isFavorite }, categoryId: category.id });
    }
  };

  return (
    <div className="flex items-center gap-2 w-full border border-solid border-border rounded-lg p-4" onClick={onClick}>
      <div 
        className={cn("flex items-center justify-center rounded size-6", sizes[size].div)}
        style={{ backgroundColor: `${category.color}2a` }}
      >
        <Icon name={category.icon} className={cn("text-white", sizes[size].icon)} color={category.color} />
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