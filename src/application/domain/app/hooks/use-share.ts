import { useState } from "react";
import { toast } from "sonner";

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);

  const share = async (data: ShareData) => {
    setIsSharing(true);
    
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(data)) {
        await navigator.share(data);
        toast.success("Compartilhado com sucesso!");
      } else {
        await navigator.clipboard.writeText(data.url);
        toast.success("Link copiado para a área de transferência!");
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      
      try {
        const textArea = document.createElement("textarea");
        textArea.value = data.url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Link copiado para a área de transferência!");
      } catch (fallbackError) {
        console.error("Erro no fallback de cópia:", fallbackError);
        toast.error("Erro ao compartilhar. Tente novamente.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return {
    share,
    isSharing,
  };
};
