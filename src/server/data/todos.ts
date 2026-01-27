import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';

export type NewTodoInput = {
  title: string;
  description?: string;
  deadline?: Date;
  categoryId: string;
};

export function addTodo({
  title,
  description,
  deadline,
  categoryId,
}: NewTodoInput): string {
  const id = uuidv4();
  db.prepare(
    `INSERT INTO todos (id, title, description, deadline, category_id, status)
     VALUES (?, ?, ?, ?, ?, 'pending')`,
  ).run(
    id,
    title,
    description ?? null,
    deadline ? deadline.toISOString() : null,
    categoryId,
  );
  return id;
}

export type TodoFromDb = {
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
  assignedTo: Array<{
    name: string;
    color: string;
  }>;
};

export function getPendingTodos(): TodoFromDb[] {
  const todos = db
    .prepare(
      `
      SELECT t.id, t.title, t.description, t.deadline, t.status,
             c.id as category_id, c.name as category_name, c.color as category_color
      FROM todos t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.status = 'pending'
      ORDER BY COALESCE(t.deadline, '9999-12-31') ASC
    `,
    )
    .all() as Array<{
    id: string;
    title: string;
    description: string | null;
    deadline: string | null;
    status: string;
    category_id: string | null;
    category_name: string | null;
    category_color: string | null;
  }>;

  const assignments = db
    .prepare(
      `
      SELECT tu.todo_id as todoId, u.name as name, u.color as color
      FROM todo_users tu
      JOIN users u ON u.id = tu.user_id
    `,
    )
    .all() as Array<{ todoId: string; name: string; color: string }>;

  const map = new Map<string, Array<{ name: string; color: string }>>();
  for (const a of assignments) {
    map.set(a.todoId, [
      ...(map.get(a.todoId) ?? []),
      { name: a.name, color: a.color },
    ]);
  }

  return todos.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description ?? undefined,
    deadline: t.deadline ? new Date(t.deadline) : undefined,
    category:
      t.category_id && t.category_name && t.category_color
        ? { id: t.category_id, name: t.category_name, color: t.category_color }
        : null,
    status: t.status,
    assignedTo: map.get(t.id) ?? [],
  }));
}

export function getCompletedTodos(): TodoFromDb[] {
  const todos = db
    .prepare(
      `
      SELECT t.id, t.title, t.description, t.deadline, t.status,
             c.id as category_id, c.name as category_name, c.color as category_color
      FROM todos t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.status = 'completed'
      ORDER BY COALESCE(t.deadline, '9999-12-31') ASC
    `,
    )
    .all() as Array<{
    id: string;
    title: string;
    description: string | null;
    deadline: string | null;
    status: string;
    category_id: string | null;
    category_name: string | null;
    category_color: string | null;
  }>;

  const assignments = db
    .prepare(
      `
      SELECT tu.todo_id as todoId, u.name as name, u.color as color
      FROM todo_users tu
      JOIN users u ON u.id = tu.user_id
    `,
    )
    .all() as Array<{ todoId: string; name: string; color: string }>;

  const map = new Map<string, Array<{ name: string; color: string }>>();
  for (const a of assignments) {
    map.set(a.todoId, [
      ...(map.get(a.todoId) ?? []),
      { name: a.name, color: a.color },
    ]);
  }

  return todos.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description ?? undefined,
    deadline: t.deadline ? new Date(t.deadline) : undefined,
    category:
      t.category_id && t.category_name && t.category_color
        ? { id: t.category_id, name: t.category_name, color: t.category_color }
        : null,
    status: t.status,
    assignedTo: map.get(t.id) ?? [],
  }));
}

export function removeTodo(id: string): void {
  db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  db.prepare('DELETE FROM todo_users WHERE todo_id = ?').run(id);
}

export function markTodoCompleted(id: string): void {
  db.prepare('UPDATE todos SET status = ? WHERE id = ?').run('completed', id);
}
