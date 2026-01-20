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
    title: 'Koupit potraviny',
    description: null,
    deadline: formatDate(nextWeek),
    category: 'domácnost',
    status: 'pending',
  });

  insertTodo.run({
    id: 't2',
    title: 'Dokončit projektovou zprávu',
    description: 'Dokončit závěrečnou zprávu pro projekt BARÁK.',
    deadline: formatDate(tomorrow),
    category: 'práce',
    status: 'pending',
  });

  insertTodo.run({
    id: 't3',
    title: 'Rezervovat termín u zubaře',
    description: null,
    deadline: formatDate(pastDate),
    category: 'zdraví',
    status: 'completed',
  });

  insertTodo.run({
    id: 't4',
    title: 'Naplánovat víkendový výlet',
    description: 'Rozhodnout o destinaci a rezervovat ubytování.',
    deadline: formatDate(today),
    category: 'rodina',
    status: 'pending',
  });

  insertTodo.run({
    id: 't5',
    title: 'Přečíst novou knihu',
    description: 'Začít číst "Velký Gatsby".',
    deadline: null,
    category: 'osobní',
    status: 'pending',
  });

  insertTodo.run({
    id: 't6',
    title: 'Uspořádat pracovní prostor',
    description: 'Vyčistit a uspořádat domácí kancelář.',
    deadline: formatDate(nextWeek),
    category: 'obecné',
    status: 'pending',
  });

  insertTodo.run({
    id: 't7',
    title: 'Lekce jógy',
    description: null,
    deadline: formatDate(tomorrow),
    category: 'osobní',
    status: 'pending',
  });

  insertTodo.run({
    id: 't8',
    title: 'Aktualizovat životopis',
    description: 'Přidat nedávné zkušenosti a dovednosti.',
    deadline: formatDate(nextWeek),
    category: 'osobní',
    status: 'pending',
  });

  insertTodo.run({
    id: 't9',
    title: 'Uklidit dům',
    description: 'Obecný úklid obývacího pokoje, kuchyně a koupelny.',
    deadline: formatDate(today),
    category: 'domácnost',
    status: 'completed',
  });

  insertTodo.run({
    id: 't10',
    title: 'Připravit prezentaci',
    description: 'Vytvořit snímky pro pondělní týmovou schůzku.',
    deadline: formatDate(tomorrow),
    category: 'práce',
    status: 'pending',
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
