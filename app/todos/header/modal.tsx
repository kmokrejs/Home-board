'use client';

import { CircleX } from 'lucide-react';
import styled from 'styled-components';
import colors from '../../styles/colors';

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
        <CloseButton onClick={onClose}>
          <CircleX size={36} color={colors.primary} />
        </CloseButton>
        <h1>Form for adding Task</h1>
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

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  cursor: pointer;
`;

const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 16px;
  border-radius: 12px;
  min-width: 300px;
  min-height: 200px;
`;
