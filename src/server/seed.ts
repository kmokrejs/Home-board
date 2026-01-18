import { db } from './db';

export function seedIfEmpty() {
  const row = db.prepare('SELECT COUNT(*) as count FROM todos').get() as {
    count: number;
  };
  console.log(row.count);

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

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 5);

  const formatDate = (date: Date) => date.toISOString();

  insertTodo.run({
    id: 't1',
    title: 'Buy groceries',
    description: null,
    deadline: formatDate(nextWeek),
    category: 'Personal',
    status: 'pending',
  });

  insertTodo.run({
    id: 't2',
    title: 'Finish project report',
    description: 'Complete the final report for the XYZ project.',
    deadline: formatDate(tomorrow),
    category: 'Work',
    status: 'in-progress',
  });

  insertTodo.run({
    id: 't3',
    title: 'Book dentist appointment',
    description: null,
    deadline: formatDate(pastDate),
    category: 'Health',
    status: 'completed',
  });

  insertTodo.run({
    id: 't4',
    title: 'Plan weekend trip',
    description: 'Decide on destination and book accommodations.',
    deadline: formatDate(today),
    category: 'Leisure',
    status: 'pending',
  });

  insertTodo.run({
    id: 't5',
    title: 'Read new book',
    description: 'Start reading "The Great Gatsby".',
    deadline: null,
    category: 'Personal Development',
    status: 'pending',
  });

  insertTodo.run({
    id: 't6',
    title: 'Organize workspace',
    description: 'Clean and organize the home office area.',
    deadline: formatDate(nextWeek),
    category: 'Productivity',
    status: 'in-progress',
  });

  insertTodo.run({
    id: 't7',
    title: 'Attend yoga class',
    description: null,
    deadline: formatDate(tomorrow),
    category: 'Health',
    status: 'pending',
  });

  insertTodo.run({
    id: 't8',
    title: 'Update resume',
    description: 'Add recent experiences and skills.',
    deadline: formatDate(nextWeek),
    category: 'Career',
    status: 'pending',
  });

  insertTodo.run({
    id: 't9',
    title: 'Clean the house',
    description: 'General cleaning of living room, kitchen, and bathroom.',
    deadline: formatDate(today),
    category: 'Chores',
    status: 'completed',
  });

  insertTodo.run({
    id: 't10',
    title: 'Prepare presentation',
    description: "Create slides for Monday's team meeting.",
    deadline: formatDate(tomorrow),
    category: 'Work',
    status: 'in-progress',
  });

  // Assignments (many-to-many)
  const assign = db.prepare(
    'INSERT INTO todo_users (todo_id, user_id) VALUES (@todo_id, @user_id)',
  );

  assign.run({ todo_id: 't1', user_id: 'u1' });
  assign.run({ todo_id: 't1', user_id: 'u2' });
  assign.run({ todo_id: 't2', user_id: 'u3' });
  assign.run({ todo_id: 't3', user_id: 'u1' });
  assign.run({ todo_id: 't4', user_id: 'u2' });
  assign.run({ todo_id: 't5', user_id: 'u3' });
  assign.run({ todo_id: 't6', user_id: 'u1' });
  assign.run({ todo_id: 't7', user_id: 'u2' });
  assign.run({ todo_id: 't8', user_id: 'u3' });
  assign.run({ todo_id: 't9', user_id: 'u1' });
  assign.run({ todo_id: 't10', user_id: 'u2' });
  assign.run({ todo_id: 't10', user_id: 'u3' });
}
