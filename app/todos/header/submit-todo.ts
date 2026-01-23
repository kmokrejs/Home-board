export async function submitTodoHandler({
  title,
  description,
  date,
  category,
}: {
  title: string;
  description?: string;
  date?: string;
  category?: string;
}): Promise<{ id?: string; error?: string }> {
  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, deadline: date, category }),
    });
    if (!res.ok) {
      const data = await res.json();
      return { error: data.error || 'Failed to add task' };
    }
    const data = await res.json();
    return { id: data.id };
  } catch (err) {
    return { error: 'Failed to add task' };
  }
}
