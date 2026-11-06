import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG } from "../data/config";
import { copyText } from "../lib/clipboard";
import { useToast } from "../components/ui/toast-context";

export function useCopyIp() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const { showToast } = useToast();

  const copy = useCallback(async () => {
    const success = await copyText(CONFIG.serverIp);
    if (success) {
      setCopied(true);
      showToast("IP copiada. Nos vemos al otro lado de la Puerta.");
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2400);
    } else {
      showToast("No se pudo copiar automáticamente. Selecciona la IP a mano.");
    }
  }, [showToast]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { copied, copy };
}
