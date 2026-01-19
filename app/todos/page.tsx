import styled from 'styled-components';
import { getTodos } from '@/src/server/data/todos';
import { Status, TodoCard } from './todo-card';
import { PageHeader } from './page-header';

const historyItems = [
  {
    title: 'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    date: new Date('2024-06-20T10:30:00'),
  },
  {
    title: 'Morning Jog',
    description: '5km run in the park',
    date: new Date('2024-06-21T07:00:00'),
  },
  {
    title: 'Read a book',
    description: 'Finish reading "The Great Gatsby"',
    date: new Date('2024-06-22T20:00:00'),
  },
];

const TodosPage = () => {
  const data = getTodos().map((t) => ({
    ...t,
    status: t.status as Status,
  }));

  return (
    <PageWrapper>
      <PageHeader />

      <TodoCardsWrapper>
        {data.map((todo, index) => (
          <TodoCard key={index} {...todo} />
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
  gap: 18px;
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
