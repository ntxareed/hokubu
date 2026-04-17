import { useEffect, useState } from "react";

const initialComposer = {
  author: "2年A組 学級委員",
  handle: "@class_2a",
  role: "生徒",
  badge: "クラス連絡",
  title: "",
  body: ""
};

function App() {
  const [feed, setFeed] = useState(null);
  const [composer, setComposer] = useState(initialComposer);
  const [status, setStatus] = useState("読み込み中...");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    const response = await fetch("/api/feed");
    const data = await response.json();
    setFeed(data);
    setStatus("サーバー接続中");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(composer)
    });

    if (!response.ok) {
      setStatus("投稿に失敗しました");
      setIsSubmitting(false);
      return;
    }

    await loadFeed();
    setComposer(initialComposer);
    setStatus("新しい連絡を投稿しました");
    setIsSubmitting(false);
  }

  if (!feed) {
    return <div className="loading-screen">学校SNSを読み込んでいます...</div>;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <p>School Square</p>
            <span>中学校の毎日を見やすく整理</span>
          </div>
        </div>

        <nav className="nav-card">
          <a href="#feed">ホーム</a>
          <a href="#features">学校機能</a>
          <a href="#schedule">今日の予定</a>
          <a href="#deploy">Render公開</a>
        </nav>

        <div className="notice-card">
          <h3>学校向け設計</h3>
          <p>
            SNSの楽しさは残しながら、連絡、宿題、安全管理を優先したUIです。
          </p>
        </div>
      </aside>

      <main className="content">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">MOBILE FIRST SCHOOL SNS</span>
            <h1>Twitterみたいに見やすくて、学校運営にも強いSNS</h1>
            <p>
              タイムライン中心の使いやすさに、時間割、宿題、欠席連絡、部活連絡、
              緊急お知らせをまとめました。中学生でも迷いにくく、先生や保護者にも優しい設計です。
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#feed">
                デザインを見る
              </a>
              <a className="secondary-btn" href="#deploy">
                Renderで公開する
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-top">
              <span>今日の学校ダッシュボード</span>
              <strong>既読率 94%</strong>
            </div>
            <div className="stats-grid">
              <article>
                <strong>{feed.summary.totalPosts}</strong>
                <span>今日の投稿</span>
              </article>
              <article>
                <strong>{feed.summary.homeworkReminders}</strong>
                <span>宿題リマインド</span>
              </article>
              <article>
                <strong>{feed.summary.urgentAlerts}</strong>
                <span>緊急通知</span>
              </article>
              <article>
                <strong>{feed.summary.attendanceRate}</strong>
                <span>出席確認</span>
              </article>
            </div>
          </div>
        </section>

        <section className="quick-actions" id="features">
          {feed.quickActions.map((action) => (
            <article key={action.label} className="action-card">
              <span>{action.icon}</span>
              <h3>{action.label}</h3>
              <p>{action.detail}</p>
            </article>
          ))}
        </section>

        <section className="feed-layout" id="feed">
          <div className="timeline">
            <div className="composer">
              <div className="composer-header">
                <h2>学校タイムライン</h2>
                <span>{status}</span>
              </div>

              <form className="composer-form" onSubmit={handleSubmit}>
                <div className="composer-box">
                  <div className="avatar">2A</div>
                  <div className="composer-input">
                    <input
                      className="text-input"
                      value={composer.title}
                      onChange={(event) =>
                        setComposer((current) => ({
                          ...current,
                          title: event.target.value
                        }))
                      }
                      placeholder="タイトル"
                      required
                    />
                    <textarea
                      className="text-area"
                      value={composer.body}
                      onChange={(event) =>
                        setComposer((current) => ({
                          ...current,
                          body: event.target.value
                        }))
                      }
                      placeholder="クラスや学校への連絡を書いてください"
                      rows="4"
                      required
                    />
                  </div>
                </div>

                <div className="composer-grid">
                  <input
                    className="text-input"
                    value={composer.author}
                    onChange={(event) =>
                      setComposer((current) => ({
                        ...current,
                        author: event.target.value
                      }))
                    }
                    placeholder="表示名"
                  />
                  <input
                    className="text-input"
                    value={composer.handle}
                    onChange={(event) =>
                      setComposer((current) => ({
                        ...current,
                        handle: event.target.value
                      }))
                    }
                    placeholder="@handle"
                  />
                  <select
                    className="text-input"
                    value={composer.role}
                    onChange={(event) =>
                      setComposer((current) => ({
                        ...current,
                        role: event.target.value
                      }))
                    }
                  >
                    <option>生徒</option>
                    <option>先生</option>
                    <option>保護者</option>
                    <option>部活</option>
                  </select>
                  <select
                    className="text-input"
                    value={composer.badge}
                    onChange={(event) =>
                      setComposer((current) => ({
                        ...current,
                        badge: event.target.value
                      }))
                    }
                  >
                    <option>クラス連絡</option>
                    <option>お知らせ</option>
                    <option>宿題</option>
                    <option>部活</option>
                    <option>保護者向け</option>
                  </select>
                </div>

                <div className="composer-actions">
                  <div className="composer-tags">
                    <span>動的投稿</span>
                    <span>学校内共有</span>
                    <span>Render対応</span>
                  </div>
                  <button className="primary-btn submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "投稿中..." : "投稿する"}
                  </button>
                </div>
              </form>
            </div>

            {feed.posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-head">
                  <div>
                    <h3>{post.author}</h3>
                    <p>
                      {post.handle} ・ {post.timeLabel}
                    </p>
                  </div>
                  <span className="badge">{post.badge}</span>
                </div>
                <h4>{post.title}</h4>
                <p className="post-body">{post.body}</p>
                <div className="post-meta">
                  {post.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="right-rail">
            <section className="rail-card" id="schedule">
              <div className="card-title">
                <h3>今日の予定</h3>
                <span>自動更新</span>
              </div>
              <div className="schedule-list">
                {feed.schedule.map((item) => (
                  <div key={item.time} className={`schedule-item ${item.type}`}>
                    <strong>{item.time}</strong>
                    <span>{item.event}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rail-card">
              <div className="card-title">
                <h3>便利な機能</h3>
              </div>
              <ul className="feature-list">
                {feed.notices.map((notice) => (
                  <li key={notice}>{notice}</li>
                ))}
              </ul>
            </section>

            <section className="deploy-card" id="deploy">
              <div className="live-stats">
                <article>
                  <strong>{feed.summary.totalPosts}</strong>
                  <span>今日の投稿</span>
                </article>
                <article>
                  <strong>{feed.summary.homeworkReminders}</strong>
                  <span>宿題通知</span>
                </article>
                <article>
                  <strong>{feed.summary.urgentAlerts}</strong>
                  <span>緊急連絡</span>
                </article>
                <article>
                  <strong>{feed.summary.attendanceRate}</strong>
                  <span>出席率</span>
                </article>
              </div>
              <h3>Renderでの公開</h3>
              <p>
                Node Web Serviceとして配置します。ビルドコマンドは
                <code> npm run build </code>
                、起動コマンドは
                <code> npm start </code>
                です。<code>DATABASE_URL</code> を設定すると PostgreSQL 保存に切り替わります。
              </p>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
