# School Square

中学校向けのSNSです。Twitterのように見やすいタイムラインを中心にしつつ、学校で便利な機能を1画面にまとめています。

## 機能

- タイムライン形式の学校連絡UI
- Express API での投稿取得・投稿作成
- 今日の時間割や学校予定の表示
- 宿題・欠席連絡・部活連絡をすぐ使える導線
- スマホ対応のレスポンシブデザイン
- Render向けの動的デプロイ設定
- `DATABASE_URL` があれば PostgreSQL 保存、なければメモリ保存で起動

## 開発

```bash
npm install
npm run dev
npm run server
```

## Render

- Build Command: `npm install && npm run build`
- Start Command: `npm start`

## 環境変数

- `PORT`: Render が自動で設定
- `DATABASE_URL`: PostgreSQL を使う場合に設定
