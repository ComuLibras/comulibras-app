import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { makeCategoriesService } from "../services/make-categories-service";
import { type UpdateCategoryFavoriteBody } from "../services/dto/categories-dto";

interface Props {
  dto: UpdateCategoryFavoriteBody;
  categoryId: string;
}

export function useUpdateCategoryFavorite() {
  const categoriesService = makeCategoriesService();
  const queryClient = useQueryClient();

  const { mutateAsync: updateCategoryFavorite, ...rest } = useMutation({
    mutationFn: ({ dto, categoryId }: Props) => categoriesService.updateCategoryFavorite(dto, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar categoria");
    },
  });

  return { updateCategoryFavorite, ...rest };
} 

export type UseUpdateCategoryFavorite = ReturnType<typeof useUpdateCategoryFavorite>;