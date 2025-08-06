import { useQuery } from "@tanstack/react-query";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  categoryId: string;
}

export function useGetSentences({ categoryId }: Props) {
  const sentencesService = makeSentencesService();

  const { data, isLoading } = useQuery({
    queryKey: ["sentences"],
    queryFn: () => sentencesService.getSentences(categoryId),
    enabled: !!categoryId,
  });

  return { sentences: data?.data ?? [], total: data?.total ?? 0, isLoading };
} 