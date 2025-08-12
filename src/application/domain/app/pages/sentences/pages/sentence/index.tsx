import { useState } from "react";
import { Header } from "@/application/domain/app/components/header";
import { Button } from "@/application/shared/components/ui/button";
import { Icon } from "@/application/shared/components/ui/icon";
import { useParams } from "react-router";
import { useGetSentenceById } from "../../hooks/use-get-sentence-by-id";
import { cn } from "@/application/shared/lib/utils";
import { useUpdateSentenceFavorite } from "../../hooks/use-update-sentence-favorite";
import { queryClient } from "@/application/shared/clients/query-client";
import { VideoPlayer } from "@/application/domain/app/components/video-player";
import { TryItModal } from "@/application/domain/app/components/try-it-modal";
import { ProtectedComponent } from "@/application/domain/app/components/protected-component";
import { useShare } from "@/application/domain/app/hooks/use-share";
import { LoadingButton } from "@/application/shared/components/ui/loading-button";

export const SentencePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sentenceId } = useParams();

  const { sentence } = useGetSentenceById({ sentenceId: sentenceId ?? '' });

  const { updateSentenceFavorite } = useUpdateSentenceFavorite();
  const { share, isSharing } = useShare();

  const handleToggleFavorite = async () => {
    await updateSentenceFavorite({ dto: { isFavorite: !sentence?.isFavorite }, sentenceId: sentenceId ?? '' });
    queryClient.invalidateQueries({ queryKey: ["sentences"] });
    queryClient.invalidateQueries({ queryKey: ["sentence", sentenceId] });
  };

  const handleShare = async () => {
    const shareData = {
      title: "ComuLibras - Frase em Libras",
      text: sentence?.content || "Confira esta frase em Libras!",
      url: window.location.href,
    };

    await share(shareData);
  };

  return (
    <div className="flex flex-col h-screen space-y-4">
      <div className="p-4 pb-0">
        <Header title="Visualizar Frase" hideSearch shouldGoBack />
      </div>

      <VideoPlayer videoUrl={sentence?.videoUrl} />

      <div className="flex justify-between items-start px-4 h-full">
        <div className="flex flex-col flex-1 justify-end">
          <h3 className="text-base font-bold">{sentence?.content}</h3>
          <p className="text-sm text-gray-500">Categoria: {sentence?.category?.name}</p>
        </div>

        <ProtectedComponent>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleToggleFavorite}>
            <Icon name="heart" className={cn("size-6", sentence?.isFavorite ? "text-red-500" : "transparent")} fill={sentence?.isFavorite ? "currentColor" : "none"} />
          </Button>
        </ProtectedComponent>
      </div>

      <footer className="flex flex-col space-y-4 p-4">
        <Button variant="outline" className="w-full" size="lg" onClick={() => setIsModalOpen(true)}>
          <Icon name="camera" className="size-4" />
          Tente você mesmo
        </Button>

        <TryItModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={sentence?.content}
          videoUrl={sentence?.videoUrl}
        />

        <LoadingButton 
          variant="default" 
          className="w-full" 
          size="lg" 
          onClick={handleShare}
          isLoading={isSharing}
          disabled={isSharing}
        >
          <Icon name="share-2" className="size-4" />
          Compartilhar
        </LoadingButton>
      </footer>

    </div>
  );
};