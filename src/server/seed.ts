import { db } from './db';

export function seedIfEmpty() {
  const row = db.prepare('SELECT COUNT(*) as count FROM todos').get() as {
    count: number;
  };

  if (row.count > 0) return;

  // Users
  const insertUser = db.prepare(
    'INSERT INTO users (id, name) VALUES (@id, @name)',
  );

  insertUser.run({ id: 'u1', name: 'Honza' });
  insertUser.run({ id: 'u2', name: 'Pepina' });
  insertUser.run({ id: 'u3', name: 'Karel' });

  // Todos
  const insertTodo = db.prepare(`
    INSERT INTO todos (id, title, description, deadline, category, status)
    VALUES (@id, @title, @description, @deadline, @category, @status)
  `);

  insertTodo.run({
    id: 't1',
    title: 'Buy groceries',
    description: null,
    deadline: '2024-06-15',
    category: 'Personal',
    status: 'pending',
  });

  insertTodo.run({
    id: 't2',
    title: 'Finish project report',
    description: 'Complete the final report for the XYZ project.',
    deadline: '2024-06-10',
    category: 'Work',
    status: 'in-progress',
  });

  insertTodo.run({
    id: 't3',
    title: 'Book dentist appointment',
    description: null,
    deadline: '2024-06-20',
    category: 'Health',
    status: 'completed',
  });

  // Assignments (many-to-many)
  const assign = db.prepare(
    'INSERT INTO todo_users (todo_id, user_id) VALUES (@todo_id, @user_id)',
  );

  assign.run({ todo_id: 't1', user_id: 'u1' });
  assign.run({ todo_id: 't1', user_id: 'u2' });
  assign.run({ todo_id: 't2', user_id: 'u3' });
}
