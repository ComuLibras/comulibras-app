import { useQuery } from "@tanstack/react-query";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  categoryId: string;
  isFavorite?: boolean;
}

export function useGetSentences({ categoryId, isFavorite }: Props) {
  const sentencesService = makeSentencesService();

  const { data, isLoading } = useQuery({
    queryKey: ["sentences", { categoryId, isFavorite }],
    queryFn: () => sentencesService.getSentences({ categoryId, isFavorite }),
    enabled: !!categoryId,
  });

  return { sentences: data?.data ?? [], total: data?.total ?? 0, isLoading, categoryName: data?.categoryName, categoryId: data?.categoryId ?? null };
} 