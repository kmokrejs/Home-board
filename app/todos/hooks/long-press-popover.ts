import { useCallback, useEffect, useRef, useState } from 'react';

type Anchor = { top: number; left: number; width: number } | null;

export function useLongPressPopover<T extends HTMLElement>(pressMs = 500) {
  const elRef = useRef<T | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>(null);

  const setElement = useCallback((node: T | null) => {
    elRef.current = node;
  }, []);

  const openAtTop = useCallback(() => {
    const rect = elRef.current?.getBoundingClientRect();
    if (!rect) return;
    setAnchor({ top: rect.top, left: rect.left, width: rect.width });
    setOpen(true);
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onPointerDown = useCallback(() => {
    clear();
    timerRef.current = setTimeout(openAtTop, pressMs);
  }, [clear, openAtTop, pressMs]);

  useEffect(() => clear, [clear]);

  return {
    setElement,
    open,
    anchor,
    close: () => setOpen(false),
    onPointerDown,
    onPointerUp: clear,
    onPointerLeave: clear,
    onPointerCancel: clear,
  };
}
