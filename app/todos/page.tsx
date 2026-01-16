import { getTodos } from '@/src/server/data/todos';
import { Status, TodoCard } from './todo-card';

const TodosPage = () => {
  const data = getTodos().map((t) => ({
    ...t,
    status: t.status as Status,
  }));

  return (
    <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
      {data.map((todo, index) => (
        <TodoCard key={index} {...todo} />
      ))}
    </div>
  );
};
export default TodosPage;
