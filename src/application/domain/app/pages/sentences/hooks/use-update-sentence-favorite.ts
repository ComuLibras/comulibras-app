import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateSentenceFavoriteBody } from "../services/dto/sentences-dto";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  dto: UpdateSentenceFavoriteBody;
  sentenceId: string;
}

export function useUpdateSentenceFavorite() {
  const sentencesService = makeSentencesService();
  const queryClient = useQueryClient();

  const { mutateAsync: updateSentenceFavorite, ...rest } = useMutation({
    mutationFn: ({ dto, sentenceId }: Props) => sentencesService.updateSentenceFavorite(dto, sentenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentences"] });
      toast.success("Frase favoritada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao favoritar frase");
    },
  });

  return { updateSentenceFavorite, ...rest };
}

export type UseUpdateSentenceFavorite = ReturnType<typeof useUpdateSentenceFavorite>; 