import React, { useCallback, useMemo, useState } from "react";
import Webcam from "react-webcam";

import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";
import { Button } from "@/application/shared/components/ui/button";
import { Icon } from "@/application/shared/components/ui/icon";

type CameraAreaProps = {
  mirrored?: boolean;
  className?: string;
};

export const CameraArea: React.FC<CameraAreaProps> = ({ mirrored = true, className }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isMirrored, setIsMirrored] = useState<boolean>(mirrored);

  const videoConstraints = useMemo<MediaTrackConstraints>(
    () => ({
      facingMode: "user",
      width: { ideal: 1280 },
      height: { ideal: 720 },
    }),
    []
  );

  const handleUserMedia = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleUserMediaError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div className={className}>
      <AspectRatio ratio={16 / 9}>
        <div className="relative w-full h-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
          {!hasError ? (
            <Webcam
              audio={false}
              mirrored={isMirrored}
              videoConstraints={videoConstraints}
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <Icon name="camera-off" className="mx-auto mb-2 size-12 text-gray-400" />
              <p className="text-sm text-gray-600">Permita o acesso à câmera nas configurações do navegador.</p>
            </div>
          )}

          {!isReady && !hasError && (
            <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-white/60 p-6 text-center">
              <Icon name="loader-2" className="mx-auto mb-2 size-8 animate-spin text-gray-400" />
              <p className="text-xs text-gray-600">Iniciando câmera…</p>
            </div>
          )}
        </div>
      </AspectRatio>

      <div className="mt-2 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => setIsMirrored((prev) => !prev)}>
          <Icon name="refresh-cw" className="size-4" />
          {isMirrored ? "Desespelhar" : "Espelhar"}
        </Button>
      </div>
    </div>
  );
};

export default CameraArea;


