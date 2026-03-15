// Hiragana data
const H = [
  { c: "あ", r: ["아"] },
  { c: "い", r: ["이"] },
  { c: "う", r: ["우"] },
  { c: "え", r: ["에"] },
  { c: "お", r: ["오"] },
  { c: "か", r: ["카"] },
  { c: "き", r: ["키"] },
  { c: "く", r: ["쿠"] },
  { c: "け", r: ["케"] },
  { c: "こ", r: ["코"] },
  { c: "さ", r: ["사"] },
  { c: "し", r: ["시", "쉬"] },
  { c: "す", r: ["스"] },
  { c: "せ", r: ["세"] },
  { c: "そ", r: ["소"] },
  { c: "た", r: ["타"] },
  { c: "ち", r: ["치"] },
  { c: "つ", r: ["츠", "쯔"] },
  { c: "て", r: ["테"] },
  { c: "と", r: ["토"] },
  { c: "な", r: ["나"] },
  { c: "に", r: ["니"] },
  { c: "ぬ", r: ["누"] },
  { c: "ね", r: ["네"] },
  { c: "の", r: ["노"] },
  { c: "は", r: ["하"] },
  { c: "ひ", r: ["히"] },
  { c: "ふ", r: ["후", "푸"] },
  { c: "へ", r: ["헤"] },
  { c: "ほ", r: ["호"] },
  { c: "ま", r: ["마"] },
  { c: "み", r: ["미"] },
  { c: "む", r: ["무"] },
  { c: "め", r: ["메"] },
  { c: "も", r: ["모"] },
  { c: "や", r: ["야"] },
  { c: "ゆ", r: ["유"] },
  { c: "よ", r: ["요"] },
  { c: "ら", r: ["라"] },
  { c: "り", r: ["리"] },
  { c: "る", r: ["루"] },
  { c: "れ", r: ["레"] },
  { c: "ろ", r: ["로"] },
  { c: "わ", r: ["와"] },
  { c: "を", r: ["오", "워"] },
  { c: "ん", r: ["응", "은"] },
];

// Katakana data
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

// Combine all characters
const ALL = [...H, ...K];
const HSET = new Set(H.map((x) => x.c));

// Application state
let queue = [];
let cleared = new Set();
let round = 1;
let stats = { n: 0, ok: 0 };
let currentFeedback = null;
let feedbackTimer = null;

// DOM elements
const celebrateScreen = document.getElementById('celebrate-screen');
const quizScreen = document.getElementById('quiz-screen');
const roundNum = document.getElementById('round-num');
const clearedCount = document.getElementById('cleared-count');
const accuracy = document.getElementById('accuracy');
const totalQuestions = document.getElementById('total-questions');
const progressBar = document.getElementById('progress-bar');
const typeBadge = document.getElementById('type-badge');
const mainCharacter = document.getElementById('main-character');
const feedbackLine = document.getElementById('feedback-line');
const feedbackText = document.getElementById('feedback-text');
const answerInput = document.getElementById('answer-input');
const queueCount = document.getElementById('queue-count');
const completedCount = document.getElementById('completed-count');
const celebrateRoundNum = document.getElementById('celebrate-round-num');
const celebrateNextNum = document.getElementById('celebrate-next-num');

// Utility function to shuffle array
function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Initialize the quiz
function init() {
  queue = shuffle(ALL);
  cleared = new Set();
  round = 1;
  stats = { n: 0, ok: 0 };
  currentFeedback = null;

  updateUI();
  answerInput.focus();
}

// Update UI with current state
function updateUI() {
  const cur = queue[0];
  if (!cur) return;

  const isH = HSET.has(cur.c);
  const acc = stats.n > 0 ? Math.round((stats.ok / stats.n) * 100) : 100;
  const pct = Math.min(100, Math.round((cleared.size / ALL.length) * 100));

  // Update stats
  roundNum.textContent = round;
  clearedCount.textContent = cleared.size;
  totalQuestions.textContent = stats.n;
  accuracy.textContent = `${acc}%`;
  accuracy.className = `stat-accuracy ${acc >= 80 ? 'good' : 'bad'}`;
  progressBar.style.width = `${pct}%`;
  queueCount.textContent = queue.length;
  completedCount.textContent = cleared.size;

  // Update character display
  typeBadge.textContent = isH ? 'ひらがな' : 'カタカナ';
  typeBadge.className = `type-badge ${isH ? 'hiragana' : 'katakana'}`;
  mainCharacter.textContent = cur.c;

  // Reset character animation
  mainCharacter.style.animation = 'none';
  setTimeout(() => {
    mainCharacter.style.animation = '';
  }, 10);

  // Update feedback
  if (currentFeedback) {
    if (currentFeedback.ok) {
      feedbackText.textContent = '✓ 정답!';
      feedbackText.className = 'correct';
      mainCharacter.className = 'main-character correct';
      answerInput.className = 'correct';
    } else {
      feedbackText.innerHTML = `✗ 정답: <b style="font-size: 22px; margin-left: 6px;">${currentFeedback.ans}</b>`;
      feedbackText.className = 'incorrect';
      mainCharacter.className = 'main-character incorrect';
      answerInput.className = 'incorrect';
    }
  } else {
    feedbackText.textContent = '';
    feedbackText.className = '';
    mainCharacter.className = 'main-character';
    answerInput.className = '';
  }
}

// Move to next question
function goNext(newQueue, newCleared) {
  if (newCleared.size === ALL.length) {
    // Show celebration screen
    celebrateRoundNum.textContent = round;
    celebrateNextNum.textContent = round + 1;
    celebrateScreen.classList.remove('hidden');
    quizScreen.style.display = 'none';

    // Reset after delay
    setTimeout(() => {
      celebrateScreen.classList.add('hidden');
      quizScreen.style.display = 'flex';
      queue = shuffle(ALL);
      cleared = new Set();
      round++;
      currentFeedback = null;
      answerInput.value = '';
      answerInput.disabled = false;
      updateUI();
      setTimeout(() => answerInput.focus(), 100);
    }, 2400);
  } else {
    queue = newQueue;
    cleared = newCleared;
    currentFeedback = null;
    answerInput.value = '';
    answerInput.disabled = false;
    updateUI();
    setTimeout(() => answerInput.focus(), 50);
  }
}

// Submit answer
function submit() {
  const cur = queue[0];
  if (!cur || currentFeedback) return;

  const ans = answerInput.value.trim();
  if (!ans) return;

  const ok = cur.r.includes(ans);
  stats.n++;
  if (ok) stats.ok++;

  currentFeedback = { ok, ans: cur.r[0] };
  answerInput.disabled = true;
  updateUI();

  if (ok) {
    const newCleared = new Set(cleared);
    newCleared.add(cur.c);
    feedbackTimer = setTimeout(() => goNext(queue.slice(1), newCleared), 620);
  } else {
    const rest = queue.slice(1);
    const pos = rest.length > 0 ? 1 + Math.floor(Math.random() * rest.length) : 0;
    const newQueue = [...rest.slice(0, pos), cur, ...rest.slice(pos)];
    feedbackTimer = setTimeout(() => goNext(newQueue, cleared), 1100);
  }
}

// Event listeners
answerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submit();
  }
});

// Prevent input when feedback is showing
answerInput.addEventListener('input', (e) => {
  if (currentFeedback) {
    e.preventDefault();
    answerInput.value = answerInput.value.slice(0, -1);
  }
});

// Initialize on load
window.addEventListener('load', init);

// Cleanup timers on page unload
window.addEventListener('beforeunload', () => {
  if (feedbackTimer) {
    clearTimeout(feedbackTimer);
  }
});
