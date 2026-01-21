'use client';

import { ChevronUp, History } from 'lucide-react';
import styled from 'styled-components';
import colors from '../styles/colors';

type HistoryItem = {
  title: string;
  description?: string | null;
  date: Date;
  category?: string | null;
};

export const TodoHistory = ({
  items,
  open,
  onToggle,
}: {
  items: HistoryItem[];
  open: boolean;
  onToggle: () => void;
}) => {
  return (
    <HistoryWrapper $open={open}>
      <HeaderWrapper>
        <TitleWrapper>
          <History size={30} color={colors.secondary} />
          <Title>Historie úkolů</Title>
        </TitleWrapper>

        <ButtonHistory type="button" onClick={onToggle}>
          <ChevronIcon $open={open}>
            <ChevronUp size={36} color={colors.secondary} />
          </ChevronIcon>
        </ButtonHistory>
      </HeaderWrapper>

      {open && (
        <Entries>
          {items.map((item, index) => (
            <HistoryRow key={index}>
              <RowTitle>{item.title}</RowTitle>
              <p>{item.description ?? ''}</p>
              <small>{item.date.toLocaleString()}</small>
            </HistoryRow>
          ))}
        </Entries>
      )}
    </HistoryWrapper>
  );
};

const HistoryWrapper = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: #ffffff;

  max-height: ${({ $open }) => ($open ? '18vh' : '75px')};
  overflow: hidden;
  height: 98%;
  transition: max-height 0.2s ease;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonHistory = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ChevronIcon = styled.span<{ $open: boolean }>`
  display: flex;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const Entries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: ${colors.secondary} transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.secondary};
    border-radius: 4px;
  }
`;

const RowTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const HistoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  color: ${colors.secondary};
`;
