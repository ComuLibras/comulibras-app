import z from "zod";

import type { IconProps } from "@/application/shared/components/ui/icon";
import { Colors } from "@/application/domain/app/components/colors-map";


export type Category = {
  id: string;
  name: string;
  color: Colors;
  icon: IconProps['name'];
  isActive: boolean;
  sentenceCount: number;
  isFavorite?: boolean | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export type GetCategoriesResponse = Category[];


export const updateCategoryFavoriteBody = z.object({
  isFavorite: z.boolean(),
});
export type UpdateCategoryFavoriteBody = z.infer<typeof updateCategoryFavoriteBody>;
export type UpdateCategoryFavoriteResponse = Category;

