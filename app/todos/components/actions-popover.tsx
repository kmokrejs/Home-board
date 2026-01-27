import { useEffect } from 'react';
import styled from 'styled-components';

export function ActionsPopover({
  open,
  onClose,
  anchor,
  children,
}: {
  open: boolean;
  onClose: () => void;
  anchor: { top: number; left: number; width: number } | null;
  children?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || !anchor) return null;

  const top = anchor.top;

  const left = anchor.left + anchor.width / 2;

  return (
    <SmallOverlay onClick={onClose}>
      <SmallModalBoxWrapper
        onClick={(e) => e.stopPropagation()}
        style={{ top, left }}
      >
        {children}
      </SmallModalBoxWrapper>
    </SmallOverlay>
  );
}

const SmallOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1001;
  background: transparent;
`;

const SmallModalBoxWrapper = styled.div`
  position: fixed;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
  padding: 12px;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  background: radial-gradient(
    circle,
    rgba(83, 140, 147, 0.46) 33%,
    rgba(83, 145, 147, 0) 45%
  );

  width: 550px;
  height: 260px;

  transform: translateX(-50%);
`;
