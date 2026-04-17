import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createStore } from "./store.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");
const port = Number(process.env.PORT || 3000);

const app = express();
const store = createStore();

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/feed", async (_req, res) => {
  const feed = await store.getFeed();
  res.json(feed);
});

app.post("/api/posts", async (req, res) => {
  const { author, handle, role, badge, title, body } = req.body ?? {};

  if (!author || !handle || !role || !badge || !title || !body) {
    return res.status(400).json({
      message: "author, handle, role, badge, title, body は必須です"
    });
  }

  const post = await store.createPost({ author, handle, role, badge, title, body });
  return res.status(201).json(post);
});

app.use(express.static(distPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

async function start() {
  await store.init();
  app.listen(port, () => {
    console.log(`School Square server listening on ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
