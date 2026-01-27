import * as React from 'react';
import { useRouter } from 'next/navigation';

export function useTodoActions() {
  const router = useRouter();

  const remove = React.useCallback(
    async (id: string) => {
      await deleteTodo(id);
      router.refresh();
    },
    [router],
  );

  const complete = React.useCallback(
    async (id: string) => {
      await markTodoCompleted(id);
      router.refresh();
    },
    [router],
  );

  return { remove, complete };
}

async function markTodoCompleted(id: string) {
  const res = await fetch('/api/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw new Error(`Mark as completed failed (${res.status})`);
  }
}

async function deleteTodo(id: string) {
  const res = await fetch('/api/todos', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    throw new Error(`Delete failed (${res.status})`);
  }
}
