import { useQuery } from "@tanstack/react-query";
import { makeCategoriesService } from "../services/make-categories-service";

export function useGetCategories(params?: { isFavorite?: boolean }) {
  const categoriesService = makeCategoriesService();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories", { isFavorite: params?.isFavorite }],
    queryFn: () => categoriesService.getCategories({ isFavorite: params?.isFavorite }),
  });

  const handleRefresh = async () => {
    await refetch();
  };

  return { categories: data?.data ?? [], isLoading, refresh: handleRefresh };
} 