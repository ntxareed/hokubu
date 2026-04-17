export const fallbackState = {
  posts: [
    {
      id: 1,
      author: "生徒会",
      handle: "@student_council",
      role: "先生",
      timeLabel: "10分前",
      badge: "お知らせ",
      title: "体育祭の色決めアンケートが始まりました",
      body:
        "ホームルーム終了までに投票してください。学年ごとの結果は放課後に自動で集計されます。",
      meta: ["投票 326", "コメント 24", "先生確認済み"],
      createdAt: "2026-04-17T08:10:00.000Z"
    },
    {
      id: 2,
      author: "2年1組 担任",
      handle: "@classroom_2_1",
      role: "先生",
      timeLabel: "25分前",
      badge: "宿題",
      title: "理科レポートは明日17:00まで",
      body:
        "ワークP.44-47を参考に、天気の変化を400字以上でまとめて提出してください。提出漏れ防止のため、未提出者にはリマインドが届きます。",
      meta: ["未提出 8", "既読率 92%", "保護者共有"],
      createdAt: "2026-04-17T07:55:00.000Z"
    },
    {
      id: 3,
      author: "吹奏楽部",
      handle: "@brass_band",
      role: "部活",
      badge: "部活",
      title: "土曜の合同練習は9:30開始です",
      body:
        "集合場所は音楽室前です。譜面台と水筒を忘れないようにしてください。雨天時は校内練習に切り替えます。",
      meta: ["参加確認 31", "持ち物", "ルート案内"],
      createdAt: "2026-04-17T07:00:00.000Z"
    }
  ],
  quickActions: [
    { label: "今日の時間割", icon: "🗓️", detail: "1限 数学 / 2限 理科 / 5限 英語" },
    { label: "宿題まとめ", icon: "✍️", detail: "提出期限が近い課題を一覧化" },
    { label: "欠席連絡", icon: "📩", detail: "保護者から学校へすぐ送信" },
    { label: "部活連絡", icon: "🏃", detail: "練習変更や持ち物を確認" }
  ],
  schedule: [
    { time: "08:20", event: "朝学活", type: "class" },
    { time: "09:00", event: "数学", type: "lesson" },
    { time: "09:55", event: "理科", type: "lesson" },
    { time: "11:50", event: "給食", type: "life" },
    { time: "15:30", event: "部活動", type: "club" }
  ],
  notices: [
    "保護者向けお便りをPDFで一括確認",
    "校内で使える安全なDMは先生承認制",
    "緊急連絡は最上部に固定表示",
    "学年別タイムラインで情報が埋もれにくい"
  ],
  summary: {
    totalPosts: 28,
    homeworkReminders: 12,
    urgentAlerts: 3,
    attendanceRate: "87%"
  }
};
