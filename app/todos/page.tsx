import styled from 'styled-components';
import { getPendingTodos, getCompletedTodos } from '@/src/server/data/todos';
import { Status, TodoCard } from './todo-card';
import { PageHeader } from './page-header';

const TodosPage = () => {
  const data = getPendingTodos().map((t) => ({
    ...t,
    status: t.status as Status,
  }));

  const historyItems = getCompletedTodos().map((t) => ({
    title: t.title,
    description: t.description,
    date: t.deadline || new Date(),
  }));

  return (
    <PageWrapper>
      <PageHeader />
      <TodoCardsWrapper>
        {data.map((todo) => (
          <TodoCard key={todo.id} {...todo} />
        ))}
      </TodoCardsWrapper>
      <HistoryWrapper>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '600',
            padding: '0',
            margin: '0',
          }}
        >
          Historie úkolů
        </h1>
        {historyItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <small>{item.date.toLocaleString()}</small>
          </div>
        ))}
      </HistoryWrapper>
    </PageWrapper>
  );
};

export default TodosPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 0;
  height: 100%;
`;

const TodoCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  gap: 18px;
  height: 100%;
  max-height: 70vh;
  overflow-y: auto;
  min-height: 0;
  flex-wrap: wrap;
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
