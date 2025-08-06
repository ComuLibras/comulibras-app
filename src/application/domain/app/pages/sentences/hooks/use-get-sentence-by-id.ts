import { useQuery } from "@tanstack/react-query";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  sentenceId: string;
}

export function useGetSentenceById({ sentenceId }: Props) {
  const sentencesService = makeSentencesService();

  const { data, isLoading } = useQuery({
    queryKey: ["sentence", sentenceId],
    queryFn: () => sentencesService.getSentence(sentenceId),
    enabled: !!sentenceId,
  });

  return { sentence: data?.data ?? null, isLoading };
} 