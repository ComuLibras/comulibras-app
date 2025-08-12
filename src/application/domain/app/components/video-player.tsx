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

    playerInstanceRef.current?.destroy();

    playerInstanceRef.current = new Plyr(containerRef.current, {
      autoplay,
      muted,
      controls: ["play-large", "play"],
      youtube: {
        noCookie: true,
        modestbranding: "1",
        rel: 0,
      },
    });

    return () => {
      playerInstanceRef.current?.destroy();
      playerInstanceRef.current = null;
    };
  }, [autoplay, muted, videoId]);

  return (
    <AspectRatio ratio={ratio}>
      <div
        ref={containerRef}
        data-plyr-provider="youtube"
        data-plyr-embed-id={videoId ?? undefined}
        className={className ?? "w-full h-full"}
      />
    </AspectRatio>
  );
};

export default VideoPlayer;


