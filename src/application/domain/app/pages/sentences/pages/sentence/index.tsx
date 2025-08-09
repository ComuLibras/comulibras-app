import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";
import { Header } from "@/application/domain/app/components/header";
import { Button } from "@/application/shared/components/ui/button";
import { Icon } from "@/application/shared/components/ui/icon";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/application/shared/components/ui/drawer";
import { useParams } from "react-router";
import { useGetSentenceById } from "../../hooks/use-get-sentence-by-id";
import { cn } from "@/application/shared/lib/utils";
import { useUpdateSentenceFavorite } from "../../hooks/use-update-sentence-favorite";
import { queryClient } from "@/application/shared/clients/query-client";

const REGEX_YOUTUBE_VIDEO_ID = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|.*v=))([A-Za-z0-9_-]{11})/;

export const SentencePage: React.FC = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sentenceId } = useParams();

  const { sentence } = useGetSentenceById({ sentenceId: sentenceId ?? '' });

  const { updateSentenceFavorite } = useUpdateSentenceFavorite();

  useEffect(() => {
    if (playerRef.current) {
      new Plyr(playerRef.current, {
        autoplay: true,
        muted: true,
        controls: [
          'play-large',
          'play',
          'fullscreen',          
        ],
        youtube: {
          noCookie: true,
          modestbranding: '1',
          rel: 0
        }
      });
    }
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleToggleFavorite = async () => {
    await updateSentenceFavorite({ dto: { isFavorite: !sentence?.isFavorite }, sentenceId: sentenceId ?? '' });
    queryClient.invalidateQueries({ queryKey: ["sentences"] });
    queryClient.invalidateQueries({ queryKey: ["sentence", sentenceId] });
  };

  const [, videoId] = sentence?.videoUrl.match(REGEX_YOUTUBE_VIDEO_ID) ?? [null, null];

  return (
    <div className="flex flex-col h-screen space-y-4">
      <div className="p-4 pb-0">
        <Header title="Visualizar Frase" hideSearch shouldGoBack />
      </div>

      <AspectRatio ratio={16 / 9}>
        <div
          ref={playerRef}
          data-plyr-provider="youtube"
          data-plyr-embed-id={videoId}
          className="w-full h-full"
        />
      </AspectRatio>

      <div className="flex justify-between items-start px-4 h-full">
        <div className="flex flex-col flex-1 justify-end">
          <h3 className="text-base font-bold">{sentence?.content}</h3>
          <p className="text-sm text-gray-500">Categoria: {sentence?.category?.name}</p>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleToggleFavorite}>
          <Icon name="heart" className={cn("size-6", sentence?.isFavorite ? "text-red-500" : "transparent")} fill={sentence?.isFavorite ? "currentColor" : "none"} />
        </Button>
      </div>

      <footer className="flex flex-col space-y-4 p-4">
        <Drawer open={isModalOpen} onOpenChange={setIsModalOpen} modal>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full" size="lg">
              <Icon name="camera" className="size-4" />
              Tente você mesmo
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-lg mx-auto" >
            <DrawerHeader>
              <DrawerTitle>Bom dia, como posso ajudar?</DrawerTitle>
            </DrawerHeader>
            
            <div className="space-y-4">
              {/* Área da câmera */}
              <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <Icon name="camera" className="size-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-3">Ativar câmera</p>
                </div>
              </div>

              <AspectRatio ratio={16 / 9}>
                <div
                  ref={playerRef}
                  data-plyr-provider="youtube"
                  data-plyr-embed-id="EeR8BR9PxEk"
                  className="w-full h-full"
                />
              </AspectRatio>

              <DrawerFooter>
                <Button 
                  variant="default" 
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white" 
                  size="lg"
                  onClick={handleModalClose}
                >
                  Consegui!
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        <Button variant="default" className="w-full" size="lg">
          <Icon name="share-2" className="size-4" />
          Compartilhar
        </Button>
      </footer>

    </div>
  );
};