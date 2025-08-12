
import { useLocation, useNavigate, useParams } from "react-router";
import { ListTile } from "../../../components/list-tile";
import { useGetSentences } from "../hooks/use-get-sentences";
import { Header } from "../../../components/header";
import { SubHeader } from "../../../components/sub-header";
import { useState } from "react";
import { SearchedSentences } from "../../../components/searched-sentences";
import ListTileLoading from "../../../components/list-tile-loading";
import PullToRefresh from 'react-simple-pull-to-refresh';


export const SentencesPage: React.FC = () => {
  const { categoryId } = useParams();
  const { state } = useLocation();
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);
  const { sentences, categoryName, isLoading, refresh } = useGetSentences({ categoryId: categoryId ?? '', isFavorite });
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  return (
    <PullToRefresh onRefresh={refresh} pullingContent="">
      <div className="p-4 space-y-4 h-dvh">
        <Header
          title={state?.categoryName ?? categoryName}
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
            {isLoading && <ListTileLoading length={10} />}

            {sentences.length === 0 && <div className="text-center text-sm text-gray-500">Nenhuma frase encontrada nessa categoria.</div>}
            {sentences.length > 0 ? (
              <div className="flex flex-col gap-2">
                {sentences.map((sentence) => (
                  <ListTile
                    key={sentence.id}
                    size="lg"
                    categoryId={sentence.category?.id}
                    color={sentence.category?.color}
                    icon='video'
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
    </PullToRefresh>
  );
};