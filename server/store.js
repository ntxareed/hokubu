import pg from "pg";
import { fallbackState } from "./data.js";

const { Pool } = pg;

function relativeTime(dateString) {
  const diffMinutes = Math.max(
    1,
    Math.floor((Date.now() - new Date(dateString).getTime()) / 60000)
  );

  if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}時間前`;
  }

  return `${Math.floor(diffHours / 24)}日前`;
}

class MemoryStore {
  constructor() {
    this.posts = [...fallbackState.posts];
    this.nextId = this.posts.length + 1;
  }

  async init() {}

  async getFeed() {
    return {
      ...fallbackState,
      posts: this.posts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => ({
          ...post,
          timeLabel: relativeTime(post.createdAt)
        }))
    };
  }

  async createPost(input) {
    const createdAt = new Date().toISOString();
    const post = {
      id: this.nextId++,
      author: input.author,
      handle: input.handle,
      role: input.role,
      badge: input.badge,
      title: input.title,
      body: input.body,
      meta: ["新着投稿", `${input.role}アカウント`, "学校内共有"],
      createdAt,
      timeLabel: relativeTime(createdAt)
    };

    this.posts.unshift(post);
    return post;
  }
}

class PostgresStore {
  constructor(connectionString) {
    this.pool = new Pool({
      connectionString,
      ssl: connectionString.includes("render.com")
        ? { rejectUnauthorized: false }
        : undefined
    });
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        author TEXT NOT NULL,
        handle TEXT NOT NULL,
        role TEXT NOT NULL,
        badge TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const countResult = await this.pool.query("SELECT COUNT(*)::int AS count FROM posts");
    if (countResult.rows[0].count === 0) {
      for (const post of fallbackState.posts) {
        await this.pool.query(
          `
            INSERT INTO posts (author, handle, role, badge, title, body, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            post.author,
            post.handle,
            post.role,
            post.badge,
            post.title,
            post.body,
            post.createdAt
          ]
        );
      }
    }
  }

  async getFeed() {
    const result = await this.pool.query(`
      SELECT id, author, handle, role, badge, title, body, created_at
      FROM posts
      ORDER BY created_at DESC
    `);

    return {
      ...fallbackState,
      posts: result.rows.map((row) => ({
        id: row.id,
        author: row.author,
        handle: row.handle,
        role: row.role,
        badge: row.badge,
        title: row.title,
        body: row.body,
        createdAt: row.created_at,
        timeLabel: relativeTime(row.created_at),
        meta: ["学校内共有", `${row.role}アカウント`, "データ保存中"]
      }))
    };
  }

  async createPost(input) {
    const result = await this.pool.query(
      `
        INSERT INTO posts (author, handle, role, badge, title, body)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, author, handle, role, badge, title, body, created_at
      `,
      [input.author, input.handle, input.role, input.badge, input.title, input.body]
    );

    const row = result.rows[0];
    return {
      id: row.id,
      author: row.author,
      handle: row.handle,
      role: row.role,
      badge: row.badge,
      title: row.title,
      body: row.body,
      createdAt: row.created_at,
      timeLabel: relativeTime(row.created_at),
      meta: ["学校内共有", `${row.role}アカウント`, "保存完了"]
    };
  }
}

export function createStore() {
  if (process.env.DATABASE_URL) {
    return new PostgresStore(process.env.DATABASE_URL);
  }

  return new MemoryStore();
}
