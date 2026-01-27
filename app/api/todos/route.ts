import { NextResponse } from 'next/server';
import {
  addTodo,
  removeTodo,
  markTodoCompleted,
} from '@/src/server/data/todos';

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const id = String(body.id ?? '').trim();
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    removeTodo(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to delete task: ' + e },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const id = String(body.id ?? '').trim();
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    markTodoCompleted(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to update task: ' + e },
      { status: 500 },
    );
  }
}

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

    // category id will get fetched in future, same as assigneed users
    const category =
      body.category && String(body.category).trim()
        ? String(body.category).trim()
        : 'test-category';

    const deadline =
      body.date && String(body.date).trim()
        ? new Date(String(body.date))
        : undefined;

    const id = addTodo({ title, description, deadline, categoryId: category });

    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to add task' + e },
      { status: 500 },
    );
  }
}
