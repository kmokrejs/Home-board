import styled from 'styled-components';
import { getCompletedTodos, getPendingTodos } from '@/src/server/data/todos';
import { PageHeader } from './header/page-header';
import { TodosClient } from './todos-client';

export default function TodosPage() {
  const todos = getPendingTodos().map((t) => ({
    ...t,
    status: t.status,
  }));

  const historyItems = getCompletedTodos();

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
