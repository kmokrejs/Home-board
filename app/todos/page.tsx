import styled from 'styled-components';
import { getCompletedTodos, getPendingTodos } from '@/src/server/data/todos';
import { Status } from './todo-card';
import { PageHeader } from './header/page-header';
import { TodosClient } from './todos-client';

export default function TodosPage() {
  const todos = getPendingTodos().map((t) => ({
    ...t,
    status: t.status as Status,
  }));

  const historyItems = getCompletedTodos().map((t) => ({
    title: t.title,
    description: t.description,
    date: t.deadline ?? new Date(),
    category: t.category,
  }));

  return (
    <PageWrapper>
      <PageHeader />
      <TodosClient todos={todos} historyItems={historyItems} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  height: 100%;
`;
