import { useState, useEffect, useRef } from "react";

const K = [
  { c: "ア", r: ["아"] },
  { c: "イ", r: ["이"] },
  { c: "ウ", r: ["우"] },
  { c: "エ", r: ["에"] },
  { c: "オ", r: ["오"] },
  { c: "カ", r: ["카"] },
  { c: "キ", r: ["키"] },
  { c: "ク", r: ["쿠"] },
  { c: "ケ", r: ["케"] },
  { c: "コ", r: ["코"] },
  { c: "サ", r: ["사"] },
  { c: "シ", r: ["시", "쉬"] },
  { c: "ス", r: ["스"] },
  { c: "セ", r: ["세"] },
  { c: "ソ", r: ["소"] },
  { c: "タ", r: ["타"] },
  { c: "チ", r: ["치"] },
  { c: "ツ", r: ["츠", "쯔"] },
  { c: "テ", r: ["테"] },
  { c: "ト", r: ["토"] },
  { c: "ナ", r: ["나"] },
  { c: "ニ", r: ["니"] },
  { c: "ヌ", r: ["누"] },
  { c: "ネ", r: ["네"] },
  { c: "ノ", r: ["노"] },
  { c: "ハ", r: ["하"] },
  { c: "ヒ", r: ["히"] },
  { c: "フ", r: ["후", "푸"] },
  { c: "ヘ", r: ["헤"] },
  { c: "ホ", r: ["호"] },
  { c: "マ", r: ["마"] },
  { c: "ミ", r: ["미"] },
  { c: "ム", r: ["무"] },
  { c: "メ", r: ["메"] },
  { c: "モ", r: ["모"] },
  { c: "ヤ", r: ["야"] },
  { c: "ユ", r: ["유"] },
  { c: "ヨ", r: ["요"] },
  { c: "ラ", r: ["라"] },
  { c: "リ", r: ["리"] },
  { c: "ル", r: ["루"] },
  { c: "レ", r: ["레"] },
  { c: "ロ", r: ["로"] },
  { c: "ワ", r: ["와"] },
  { c: "ヲ", r: ["오", "워"] },
  { c: "ン", r: ["응", "은"] },
];
const ALL = K;

function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function App() {
  const [queue, setQueue] = useState(() => shuffle(ALL));
  const [cleared, setCleared] = useState(() => new Set());
  const [input, setInput] = useState("");
  const [fb, setFb] = useState(null);
  const [round, setRound] = useState(1);
  const [stats, setStats] = useState({ n: 0, ok: 0 });
  const [celebrate, setCelebrate] = useState(false);
  const [charKey, setCharKey] = useState(0);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes popIn { from { transform: scale(0.75); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
      @keyframes celebIn { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
      input:focus { border-color: rgba(139,92,246,0.8) !important; box-shadow: 0 0 0 3px rgba(139,92,246,0.15); }
      input::placeholder { color: rgba(255,255,255,0.2); }
    `;
    document.head.appendChild(style);
    inputRef.current?.focus();
    return () => {
      document.head.removeChild(style);
      clearTimeout(timerRef.current);
    };
  }, []);

  const cur = queue[0];
  const acc = stats.n > 0 ? Math.round((stats.ok / stats.n) * 100) : 100;
  const pct = Math.min(100, Math.round((cleared.size / ALL.length) * 100));

  const goNext = (nq, nc) => {
    if (nc.size === ALL.length) {
      setCelebrate(true);
      timerRef.current = setTimeout(() => {
        setQueue(shuffle(ALL));
        setCleared(new Set());
        setInput("");
        setFb(null);
        setRound((r) => r + 1);
        setCelebrate(false);
        setCharKey((k) => k + 1);
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 2400);
    } else {
      setQueue(nq);
      setInput("");
      setFb(null);
      setCharKey((k) => k + 1);
      timerRef.current = setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const submit = () => {
    if (!cur || fb || celebrate) return;
    const ans = input.trim();
    if (!ans) return;
    const ok = cur.r.includes(ans);
    setStats((s) => ({ n: s.n + 1, ok: s.ok + (ok ? 1 : 0) }));
    setFb({ ok, ans: cur.r[0], shake: !ok });
    if (ok) {
      const nc = new Set(cleared);
      nc.add(cur.c);
      setCleared(nc);
      timerRef.current = setTimeout(() => goNext(queue.slice(1), nc), 620);
    } else {
      const rest = queue.slice(1);
      const pos =
        rest.length > 0 ? 1 + Math.floor(Math.random() * rest.length) : 0;
      const nq = [...rest.slice(0, pos), cur, ...rest.slice(pos)];
      timerRef.current = setTimeout(() => goNext(nq, cleared), 1100);
    }
  };

  const accentColor = "#93c5fd";
  const accentBg = "rgba(59,130,246,0.12)";
  const accentBorder = "rgba(59,130,246,0.25)";

  if (celebrate)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg,#0f0c29,#302b63,#24243e)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            animation: "celebIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 16 }}>🎉</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#4ade80",
              marginBottom: 8,
            }}
          >
            완벽해요!
          </div>
          <div
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 4,
            }}
          >
            Round {round} 클리어
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            Round {round + 1} 준비 중...
          </div>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#0f0c29,#302b63,#24243e)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Noto Sans KR','Segoe UI',sans-serif",
        color: "#e0e0e0",
        userSelect: "none",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Round badge */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          fontSize: 11,
          color: "rgba(255,255,255,0.25)",
          background: "rgba(255,255,255,0.05)",
          padding: "4px 12px",
          borderRadius: 20,
          letterSpacing: 0.5,
        }}
      >
        ROUND {round}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 18,
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        <span>
          진도{" "}
          <b style={{ color: "#c4b5fd", fontWeight: 700 }}>
            {cleared.size}
            <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.25)" }}>
              /{ALL.length}
            </span>
          </b>
        </span>
        <span>
          정확도{" "}
          <b
            style={{
              color: acc >= 80 ? "#4ade80" : "#f87171",
              fontWeight: 700,
            }}
          >
            {acc}%
          </b>
        </span>
        <span>
          총{" "}
          <b style={{ color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
            {stats.n}
          </b>
          문제
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 340,
          height: 5,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: 36,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg,#6366f1,#a855f7)",
            borderRadius: 3,
            transition: "width 0.5s ease",
          }}
        />
      </div>

      {cur && (
        <>
          {/* Type badge */}
          <div
            style={{
              padding: "3px 14px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 14,
              background: accentBg,
              color: accentColor,
              border: `1px solid ${accentBorder}`,
            }}
          >
            カタカナ
          </div>

          {/* Main character */}
          <div
            key={charKey}
            style={{
              fontSize: 124,
              lineHeight: 1.15,
              fontWeight: 300,
              color: !fb ? "#ffffff" : fb.ok ? "#4ade80" : "#f87171",
              textShadow: !fb
                ? "0 0 60px rgba(139,92,246,0.55)"
                : fb.ok
                  ? "0 0 60px rgba(74,222,128,0.5)"
                  : "0 0 60px rgba(248,113,113,0.5)",
              transition: "color 0.12s,text-shadow 0.12s",
              minHeight: 148,
              display: "flex",
              alignItems: "center",
              animation:
                fb && !fb.ok
                  ? "shake 0.35s ease"
                  : "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {cur.c}
          </div>

          {/* Feedback line */}
          <div
            style={{
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 19,
              fontWeight: 700,
              marginBottom: 18,
              minWidth: 200,
              textAlign: "center",
            }}
          >
            {fb?.ok && (
              <span style={{ color: "#4ade80", animation: "popIn 0.25s ease" }}>
                ✓ 정답!
              </span>
            )}
            {fb && !fb.ok && (
              <span style={{ color: "#f87171", animation: "popIn 0.25s ease" }}>
                ✗ 정답: <b style={{ fontSize: 22, marginLeft: 6 }}>{fb.ans}</b>
              </span>
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              if (!fb) setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="발음 입력 후 Enter ↵"
            disabled={!!fb}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              width: 210,
              padding: "13px 18px",
              fontSize: 22,
              textAlign: "center",
              background: "rgba(255,255,255,0.07)",
              border: `2px solid ${!fb ? "rgba(255,255,255,0.15)" : fb.ok ? "rgba(74,222,128,0.6)" : "rgba(248,113,113,0.6)"}`,
              borderRadius: 14,
              color: "#fff",
              outline: "none",
              transition: "border-color 0.15s",
              caretColor: "#a855f7",
              letterSpacing: 2,
            }}
          />

          {/* Bottom hint */}
          <div
            style={{
              marginTop: 14,
              fontSize: 11,
              color: "rgba(255,255,255,0.15)",
              letterSpacing: 0.5,
            }}
          >
            큐 {queue.length}개 남음 · 완료 {cleared.size}자
          </div>
        </>
      )}
    </div>
  );
}
