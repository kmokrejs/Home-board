'use client';

import { useState } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import { TodoHistory } from './todo-history';
import { TodoCard } from './components/todo-card';

type Todo = {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  category: {
    id: string;
    name: string;
    color: string;
  } | null;
  status: string;
  assignedTo: {
    name: string;
    color: string;
  }[];
};

type HistoryItem = {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  category: {
    id: string;
    name: string;
    color: string;
  } | null;
  status: string;
  assignedTo: {
    name: string;
    color: string;
  }[];
};

export function TodosClient({
  todos,
  historyItems,
}: {
  todos: Todo[];
  historyItems: HistoryItem[];
}) {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <PageWrapper>
      <TodoCardsWrapper $historyOpen={historyOpen}>
        {todos.map((todo) => (
          <TodoCard key={todo.id} {...todo} />
        ))}
      </TodoCardsWrapper>
      <TodoHistory
        items={historyItems}
        open={historyOpen}
        onToggle={() => setHistoryOpen((v) => !v)}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  height: 100%;
  justify-content: space-between;
`;

const TodoCardsWrapper = styled.div<{ $historyOpen: boolean }>`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  gap: 18px;
  flex-wrap: wrap;
  border-radius: 20px;
  position: relative;
  transition: max-height 0.2s ease;

  overflow-y: auto;
  min-height: 0;

  max-height: ${({ $historyOpen }) => ($historyOpen ? '70vh' : '82vh')};

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
