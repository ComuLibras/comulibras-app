import React, { useEffect, useMemo, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";



type VideoPlayerProps = {
  videoUrl?: string | null;
  videoId?: string | null;
  autoplay?: boolean;
  muted?: boolean;
  ratio?: number;
  className?: string;
};

const REGEX_YOUTUBE_VIDEO_ID = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/shorts\/|.*v=))([A-Za-z0-9_-]{11})/;

function extractYouTubeIdFromUrl(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(REGEX_YOUTUBE_VIDEO_ID);
  return match?.[1] ?? null;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  videoId: explicitVideoId,
  autoplay = true,
  muted = true,
  ratio = 16 / 9,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<Plyr | null>(null);

  const videoId = useMemo(() => explicitVideoId ?? extractYouTubeIdFromUrl(videoUrl), [explicitVideoId, videoUrl]);

  useEffect(() => {
    if (!containerRef.current || !videoId) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Bloquear qualquer interação no iframe */
      .plyr__video-wrapper iframe[src*="youtube"] {
        pointer-events: none !important;
      }

      /* Criar overlay para garantir bloqueio visual */
      .plyr__video-wrapper {
        position: relative;
      }
      .plyr__video-wrapper::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 9999;
        background: transparent;
      }

      /* Pequeno ajuste de imagem para suavizar (opcional) */
      .plyr__video-wrapper iframe[src*="youtube"] {
        filter: brightness(1.05) contrast(1.1) saturate(1.1) !important;
      }
    `;
    document.head.appendChild(style);

    playerInstanceRef.current?.destroy();

    playerInstanceRef.current = new Plyr(containerRef.current, {
      autoplay,
      muted,
      loop: { active: true },
      controls: ["play-large", "play"],
      youtube: {
        noCookie: true,
        modestbranding: "1",
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        fs: 0,
        disablekb: 1,
        controls: 0,
        loop: 1,
        playlist: videoId,
        origin: window.location.origin,
        enablejsapi: 1,
        host: "https://www.youtube-nocookie.com",
      },
    });

    return () => {
      playerInstanceRef.current?.destroy();
      playerInstanceRef.current = null;
      document.head.removeChild(style);
    };
  }, [autoplay, muted, videoId]);

  return (
    <AspectRatio ratio={ratio}>
      <div
        ref={containerRef}
        data-plyr-provider="youtube"
        data-plyr-embed-id={videoId ?? undefined}
        className={className ?? "w-full h-full"}
        style={{
          position: 'relative',
        }}
      />
    </AspectRatio>
  );
};

export default VideoPlayer;


