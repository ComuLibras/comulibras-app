import React from "react";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/application/shared/components/ui/drawer";
import { Button } from "@/application/shared/components/ui/button";
import { Icon } from "@/application/shared/components/ui/icon";
import { CameraArea } from "./camera-area";
import { VideoPlayer } from "./video-player";

type TryItModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  videoUrl?: string | null;
  videoId?: string | null;
  onConfirm?: () => void;
};

export const TryItModal: React.FC<TryItModalProps> = ({
  open,
  onOpenChange,
  title = "Tente você mesmo",
  videoUrl,
  onConfirm,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} modal>
      <DrawerContent className="max-w-lg mx-auto">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4 px-4">
          <CameraArea />

          <VideoPlayer videoUrl={videoUrl ?? undefined} />

          <DrawerFooter>
            <Button
              variant="default"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white"
              size="lg"
              onClick={() => {
                onOpenChange(false);
                onConfirm?.();
              }}
            >
              <Icon name="check" className="size-4" />
              Consegui!
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TryItModal;


