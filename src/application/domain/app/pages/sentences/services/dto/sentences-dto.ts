import z from "zod";
import type { Category } from "../../../categories/services/dto/categories-dto";

export type Sentence = {
  id: string;
  content: string;
  videoUrl: string;
  categoryId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean | undefined;
  category?: Category;
}
export type GetSentencesResponse = {
  sentences: Sentence[];
  totalSentences: number;
};

export type GetSentenceResponse = Sentence;

export const updateSentenceFavoriteBody = z.object({
  isFavorite: z.boolean(),
});
export type UpdateSentenceFavoriteBody = z.infer<typeof updateSentenceFavoriteBody>;
export type UpdateSentenceFavoriteResponse = Sentence;
