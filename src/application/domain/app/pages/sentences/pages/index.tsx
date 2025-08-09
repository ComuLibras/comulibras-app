
import { useNavigate, useParams } from "react-router";
import { ListTile } from "../../../components/list-tile";
import { useGetSentences } from "../hooks/use-get-sentences";
import { Header } from "../../../components/header";
import { SubHeader } from "../../../components/sub-header";
import { useMemo, useState } from "react";
import { SearchedSentences } from "../../../components/searched-sentences";

export const SentencesPage: React.FC = () => {
  const { categoryId } = useParams();
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);
  const { sentences } = useGetSentences({ categoryId: categoryId ?? '', isFavorite });
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  const categoryName = useMemo(() => {
    return sentences[0]?.category?.name ?? 'Frases';
  }, [sentences]);

  return (
    <div className="p-4 space-y-4">
      <Header
        title={categoryName}
        placeholder="Pesquisar frases..."
        shouldGoBack
        search={search}
        onSearchChange={setSearch}
      />

      <SearchedSentences search={search} categoryId={categoryId} isFavorite={isFavorite} />

      {search.trim().length === 0 && (
        <>
          <SubHeader
            title="Frases disponíveis"
            checked={Boolean(isFavorite)}
            onCheckedChange={(checked) => setIsFavorite(checked ? true : undefined)}
          />
          {sentences.length > 0 ? (
            <div className="flex flex-col gap-2">
              {sentences.map((sentence) => (
                <ListTile
                  key={sentence.id}
                  size="lg"
                  category={sentence.category}
                  title={sentence.content}
                  subtitle="Toque para ver o vídeo"
                  sentenceId={sentence.id}
                  isFavorite={sentence.isFavorite}
                  onClick={() => navigate(`/app/sentences/sentence/${sentence.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Nenhuma frase encontrada nessa categoria.</div>
          )}

          
        </>
      )}
    </div>
  );
};