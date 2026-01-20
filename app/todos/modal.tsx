'use client';

import { CircleX } from 'lucide-react';
import styled from 'styled-components';

export const Modal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h1>Empty modal</h1>
        <button
          style={{
            padding: '10px 20px',
            border: '1px solid',
            borderRadius: '50px',
          }}
          onClick={onClose}
        >
          <CircleX size={36} />
        </button>
      </ModalBox>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 24px;
  border-radius: 12px;
  min-width: 300px;
  min-height: 200px;
`;
