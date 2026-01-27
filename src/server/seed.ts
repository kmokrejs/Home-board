import { db } from './db';

export function seedIfEmpty() {
  const row = db.prepare('SELECT COUNT(*) as count FROM todos').get() as {
    count: number;
  };
  console.log(row.count);

  if (row.count > 0) return;

  // Categories
  const categories = [
    { id: 'c1', name: 'domácnost', color: '#fbbf24' },
    { id: 'c2', name: 'práce', color: '#3b82f6' },
    { id: 'c3', name: 'zdraví', color: '#10b981' },
    { id: 'c4', name: 'rodina', color: '#f472b6' },
    { id: 'c5', name: 'osobní', color: '#6366f1' },
  ];
  const insertCategory = db.prepare(
    'INSERT INTO categories (id, name, color) VALUES (@id, @name, @color)',
  );
  for (const cat of categories) insertCategory.run(cat);

  // Users
  const users = [
    { id: 'u1', name: 'Honza', color: 'blue' },
    { id: 'u2', name: 'Pepina', color: 'red' },
    { id: 'u3', name: 'Karel', color: 'green' },
  ];
  const insertUser = db.prepare(
    'INSERT INTO users (id, name, color) VALUES (@id, @name, @color)',
  );
  for (const user of users) insertUser.run(user);

  // Todos
  const insertTodo = db.prepare(`
    INSERT INTO todos (id, title, description, deadline, category_id, status)
    VALUES (@id, @title, @description, @deadline, @category_id, @status)
  `);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 5);
  const formatDate = (date: Date) => date.toISOString();

  const todos = [
    {
      id: 't1',
      title: 'Koupit potraviny',
      description: null,
      deadline: formatDate(nextWeek),
      category_id: 'c1',
      status: 'pending',
    },
    {
      id: 't2',
      title: 'Dokončit projektovou zprávu',
      description: 'Dokončit závěrečnou zprávu pro projekt BARÁK.',
      deadline: formatDate(tomorrow),
      category_id: 'c2',
      status: 'pending',
    },
    {
      id: 't3',
      title: 'Rezervovat termín u zubaře',
      description: null,
      deadline: formatDate(pastDate),
      category_id: 'c3',
      status: 'completed',
    },
    {
      id: 't4',
      title: 'Naplánovat víkendový výlet',
      description: 'Rozhodnout o destinaci a rezervovat ubytování.',
      deadline: formatDate(today),
      category_id: 'c4',
      status: 'pending',
    },
    {
      id: 't5',
      title: 'Přečíst novou knihu',
      description: 'Začít číst "Velký Gatsby".',
      deadline: null,
      category_id: 'c5',
      status: 'pending',
    },
    {
      id: 't6',
      title: 'Uspořádat pracovní prostor',
      description: 'Vyčistit a uspořádat domácí kancelář.',
      deadline: formatDate(nextWeek),
      category_id: 'c5',
      status: 'pending',
    },
    {
      id: 't7',
      title: 'Lekce jógy',
      description: null,
      deadline: formatDate(tomorrow),
      category_id: 'c5',
      status: 'pending',
    },
    {
      id: 't8',
      title: 'Aktualizovat životopis',
      description: 'Přidat nedávné zkušenosti a dovednosti.',
      deadline: formatDate(nextWeek),
      category_id: 'c5',
      status: 'pending',
    },
    {
      id: 't9',
      title: 'Uklidit dům',
      description: 'Obecný úklid obývacího pokoje, kuchyně a koupelny.',
      deadline: formatDate(today),
      category_id: 'c1',
      status: 'completed',
    },
    {
      id: 't10',
      title: 'Připravit prezentaci',
      description: 'Vytvořit snímky pro pondělní týmovou schůzku.',
      deadline: formatDate(tomorrow),
      category_id: 'c2',
      status: 'pending',
    },
  ];
  for (const todo of todos) insertTodo.run(todo);

  // Assignments (many-to-many, random, some todos may have no assignee)
  const assign = db.prepare(
    'INSERT INTO todo_users (todo_id, user_id) VALUES (@todo_id, @user_id)',
  );
  // Randomly assign 0-2 users to each todo
  for (const todo of todos) {
    const shuffled = users.map((u) => u.id).sort(() => 0.5 - Math.random());
    const numAssignees = Math.floor(Math.random() * 3); // 0, 1, or 2
    for (let i = 0; i < numAssignees; i++) {
      assign.run({ todo_id: todo.id, user_id: shuffled[i] });
    }
  }
}
