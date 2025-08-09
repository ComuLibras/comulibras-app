import { useMemo } from "react";
import { useNavigate } from "react-router";
import { SubHeader } from "./sub-header";
import { ListTile } from "./list-tile";
import { useGetSentencesBySearch } from "../hooks/use-get-sentences-by-search";
import type { Sentence } from "../pages/sentences/services/dto/sentences-dto";

type Props = {
  search: string;
  categoryId?: string;
};

export const SearchedSentences: React.FC<Props> = ({ search, categoryId }) => {
  const navigate = useNavigate();

  const { sentences, total, isLoading } = useGetSentencesBySearch({
    search,
    categoryId,
  });

  const shouldRender = useMemo(() => search.trim().length > 0, [search]);

  if (!shouldRender) return null;

  return (
    <div className="space-y-3">
      <SubHeader title={`${total} frases encontradas para "${search}"`} muted />

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
              category={sentence.category}
              title={sentence.content}
              subtitle="Toque para ver o vídeo"
              onClick={() => navigate(`/app/sentences/sentence/${sentence.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

