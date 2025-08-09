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
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(`Categoria ${data.isFavorite ? "favoritada" : "removida dos favoritos"} com sucesso!`);
    },
    onError: (_, variables) => {
      toast.error(`Erro ao ${variables.dto.isFavorite ? "favoritar" : "remover dos favoritos"} categoria`);
    },
  });

  return { updateCategoryFavorite, ...rest };
} 

export type UseUpdateCategoryFavorite = ReturnType<typeof useUpdateCategoryFavorite>;