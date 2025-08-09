import type { Category } from "@/application/domain/app/pages/categories/services/dto/categories-dto";
import { Button } from "@/application/shared/components/ui/button";
import { Icon } from "@/application/shared/components/ui/icon";
import { cn } from "@/application/shared/lib/utils";
import { emptyCategory } from "@/application/shared/utils/empty-category";

type Props = {
  category?: Category;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  title: string;
  subtitle: string;
}

export function ListTile({ category = emptyCategory, size = "sm", onClick, title, subtitle }: Props) {
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
        <Button variant="ghost" size="icon">
          <Icon name="heart" className="size-6" />
        </Button>
        <Icon name="chevron-right" className="size-6" />
      </div>
    </div>
  )
}