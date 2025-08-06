import { useQuery } from "@tanstack/react-query";
import { makeCategoriesService } from "../services/make-categories-service";

export function useGetCategories() {
  const categoriesService = makeCategoriesService();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.getCategories.bind(categoriesService),
  });

  return { categories: data?.data ?? [], isLoading };
} 