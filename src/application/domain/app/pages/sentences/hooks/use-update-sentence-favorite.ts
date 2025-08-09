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
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["sentences"] });
      queryClient.invalidateQueries({ queryKey: ["sentence", data.id] });
      toast.success(`Frase ${data.isFavorite ? "favoritada" : "removida dos favoritos"} com sucesso!`);
    },
    onError: (_, variables) => {
      toast.error(`Erro ao ${variables.dto.isFavorite ? "favoritar" : "remover dos favoritos"} frase`);
    },
  });

  return { updateSentenceFavorite, ...rest };
}

export type UseUpdateSentenceFavorite = ReturnType<typeof useUpdateSentenceFavorite>; 