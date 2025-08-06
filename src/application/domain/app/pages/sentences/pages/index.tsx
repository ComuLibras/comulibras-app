
import { useNavigate, useParams } from "react-router";
import { Colors } from "../../../components/colors-map";
import { ListTile } from "../../../components/list-tile";
import { useGetSentences } from "../hooks/use-get-sentences";
import { Header } from "../../../components/header";
import { SubHeader } from "../../../components/sub-header";

export const SentencesPage: React.FC = () => {
  const { categoryId } = useParams();
  const { sentences } = useGetSentences({ categoryId: categoryId ?? '' });

  const navigate = useNavigate();

  return (
    <div className="p-4">
      <Header title="Portaria" placeholder="Pesquisar frases..." shouldGoBack />
      <SubHeader title="Frases disponíveis" />
      <div className="flex flex-col gap-2">
        {sentences.map((sentence) => (
          <ListTile
            key={sentence.id}
            size="lg"
            category={sentence.category! ?? {
              id: '1',
              name: 'Portaria',
              color: Colors.Violeta,
              icon: 'house',
              isActive: true,
              sentenceCount: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
            title={sentence.content}
            subtitle="Toque para ver o vídeo"
            onClick={() => navigate(`/app/sentences/sentence/${sentence.id}`)}
          />
        ))}
      </div>
    </div>
  );
};