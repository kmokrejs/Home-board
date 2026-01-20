import { db } from '../db';

export type TodoFromDb = {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  category?: string;
  status: string;
  assignedTo: string[];
};

export function getPendingTodos(): TodoFromDb[] {
  const todos = db
    .prepare(
      `
      SELECT id, title, description, deadline, category, status
      FROM todos
      WHERE status == 'pending'
      ORDER BY COALESCE(deadline, '9999-12-31') ASC
    `,
    )
    .all() as Array<{
    id: string;
    title: string;
    description: string | null;
    deadline: string | null;
    category: string | null;
    status: string;
  }>;

  const assignments = db
    .prepare(
      `
      SELECT tu.todo_id as todoId, u.name as name
      FROM todo_users tu
      JOIN users u ON u.id = tu.user_id
    `,
    )
    .all() as Array<{ todoId: string; name: string }>;

  const map = new Map<string, string[]>();
  for (const a of assignments) {
    map.set(a.todoId, [...(map.get(a.todoId) ?? []), a.name]);
  }

  return todos.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description ?? undefined,
    deadline: t.deadline ? new Date(t.deadline) : undefined,
    category: t.category ?? undefined,
    status: t.status,
    assignedTo: map.get(t.id) ?? [],
  }));
}

export function getCompletedTodos(): TodoFromDb[] {
  const todos = db
    .prepare(
      `
      SELECT id, title, description, deadline, category, status
      FROM todos
      WHERE status == 'completed'
      ORDER BY COALESCE(deadline, '9999-12-31') ASC
    `,
    )
    .all() as Array<{
    id: string;
    title: string;
    description: string | null;
    deadline: string | null;
    category: string | null;
    status: string;
  }>;

  const assignments = db
    .prepare(
      `
      SELECT tu.todo_id as todoId, u.name as name
      FROM todo_users tu
      JOIN users u ON u.id = tu.user_id
    `,
    )
    .all() as Array<{ todoId: string; name: string }>;

  const map = new Map<string, string[]>();
  for (const a of assignments) {
    map.set(a.todoId, [...(map.get(a.todoId) ?? []), a.name]);
  }

  return todos.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description ?? undefined,
    deadline: t.deadline ? new Date(t.deadline) : undefined,
    category: t.category ?? undefined,
    status: t.status,
    assignedTo: map.get(t.id) ?? [],
  }));
}
