import { NextResponse } from 'next/server';
import { addTodo } from '@/src/server/data/todos';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = String(body.title ?? '').trim();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const description =
      body.description && String(body.description).trim()
        ? String(body.description).trim()
        : undefined;

    const category =
      body.category && String(body.category).trim()
        ? String(body.category).trim()
        : undefined;

    const deadline =
      body.date && String(body.date).trim()
        ? new Date(String(body.date))
        : undefined;

    const id = addTodo({ title, description, deadline, category });

    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to add task' + e },
      { status: 500 },
    );
  }
}
