import { db } from './db';

export function migrate() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      color TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      deadline TEXT, -- ISO string
      category_id TEXT,
      status TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      color TEXT NOT NULL
    );

    -- Many-to-many: a todo can have multiple users or none
    CREATE TABLE IF NOT EXISTS todo_users (
      todo_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      PRIMARY KEY (todo_id, user_id),
      FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_todo_users_todo_id ON todo_users(todo_id);
    CREATE INDEX IF NOT EXISTS idx_todo_users_user_id ON todo_users(user_id);
    CREATE INDEX IF NOT EXISTS idx_todos_category_id ON todos(category_id);
  `);
  console.log('Migration complete ✅');
}
