import { useQuery } from "@tanstack/react-query";
import { makeCategoriesService } from "../services/make-categories-service";

export function useGetCategories(params?: { isFavorite?: boolean }) {
  const categoriesService = makeCategoriesService();

  const { data, isLoading } = useQuery({
    queryKey: ["categories", { isFavorite: params?.isFavorite }],
    queryFn: () => categoriesService.getCategories({ isFavorite: params?.isFavorite }),
  });

  return { categories: data?.data ?? [], isLoading };
} 