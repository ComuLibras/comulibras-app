import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type UpdateSentenceBody } from "../services/dto/sentences-dto";
import { makeSentencesService } from "../services/make-sentences-service";

interface Props {
  dto: UpdateSentenceBody;
  sentenceId: string;
}

export function useUpdateSentence() {
  const sentencesService = makeSentencesService();
  const queryClient = useQueryClient();

  const { mutateAsync: updateSentence, ...rest } = useMutation({
    mutationFn: ({ dto, sentenceId }: Props) => sentencesService.updateSentence(dto, sentenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentences"] });
      toast.success("Frase atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar frase");
    },
  });

  return { updateSentence, ...rest };
} 