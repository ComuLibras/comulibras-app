import { useMemo } from "react";
import { useNavigate } from "react-router";
import { SubHeader } from "./sub-header";
import { ListTile } from "./list-tile";
import { useGetSentencesBySearch } from "../hooks/use-get-sentences-by-search";
import type { Sentence } from "../pages/sentences/services/dto/sentences-dto";

type Props = {
  search: string;
  categoryId?: string;
  isFavorite?: boolean;
};

export const SearchedSentences: React.FC<Props> = ({ search, categoryId, isFavorite }) => {
  const navigate = useNavigate();

  const { sentences, total, isLoading } = useGetSentencesBySearch({
    search,
    categoryId,
    isFavorite,
  });

  const shouldRender = useMemo(() => search.trim().length > 0, [search]);
  const categoryName = useMemo(() => categoryId ? sentences[0]?.category?.name ?? '' : '', [sentences, categoryId]);

  if (!shouldRender) return null;

  return (
    <div className="space-y-3">
      <SubHeader title={`${total} frases encontradas para "${search}" ${categoryName ? `em "${categoryName}"` : ''}`} muted hideSwitch />

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Carregando…</div>
      ) : sentences.length === 0 ? (
        <div className="text-sm text-muted-foreground">Nenhuma frase encontrada.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {sentences.map((sentence: Sentence) => (
            <ListTile
              key={sentence.id}
              size="lg"
              categoryId={sentence.category?.id}
              color={sentence.category?.color}
              icon={sentence.category?.icon}
              title={sentence.content}
              subtitle="Toque para ver o vídeo"
              sentenceId={sentence.id}
              isFavorite={sentence.isFavorite}
              onClick={() => navigate(`/app/sentences/sentence/${sentence.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

