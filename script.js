// EmailJS初期化
(function(){
  emailjs.init("JGZt53LQJjdb0E3KF");
})();

// 正解データ（ここを書き換える）
const correct = {
  by: "1996",
  bm: "4",
  bd: "13",
  bfamily: ["葛󠄀谷","葛谷"],
  bname: "雄斗",
  gy: "1994",
  gm: "8",
  gd: "15",
  gfamily: "工藤",
  gname: "紗華"
};

// 質問リスト
const questions = [
  "紗華のことが好き？",
  "紗華とずっと一緒にいることを誓う？",
  "結婚する？"
];

let answers = [];
let current = 0;
let noBtn;

// 初期化
window.addEventListener("DOMContentLoaded", () => {
  noBtn = document.getElementById("noBtn");

  resetNoPosition();

  noBtn.addEventListener("mouseover", moveNo);

  // クリック時の変な挙動防止
  noBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
});

// ログイン
function login() {
  const fields = ["by","bm","bd","bfamily","bname","gy","gm","gd","gfamily","gname"];

  for (let f of fields) {
    const input = document.getElementById(f).value.trim();
    const answer = correct[f];

    if (Array.isArray(answer)) {
      if (!answer.includes(input)) {
        document.getElementById("error").innerText = "入力が違います";
        return;
      }
    } else {
      if (input !== answer) {
        document.getElementById("error").innerText = "入力が違います";
        return;
      }
    }
  }

  document.getElementById("login").classList.add("hidden");
  document.getElementById("question").classList.remove("hidden");
  showQuestion();
}

// 質問表示
function showQuestion() {
  document.getElementById("qText").innerText = questions[current];
  resetNoPosition();
}

// 回答
function answer(a) {
  answers.push({ q: questions[current], a });
  current++;

  if (current >= questions.length) {
    sendEmail();
    document.getElementById("question").classList.add("hidden");
    document.getElementById("done").classList.remove("hidden");
  } else {
    showQuestion();
  }
}

// Noボタン移動
function moveNo() {
  const range = 80;

  const rect = noBtn.getBoundingClientRect();

  let top = rect.top;
  let left = rect.left;

  const dx = (Math.random() - 0.5) * range;
  const dy = (Math.random() - 0.5) * range;

  let newTop = top + dy;
  let newLeft = left + dx;

  const margin = 10;
  const maxTop = window.innerHeight - noBtn.offsetHeight - margin;
  const maxLeft = window.innerWidth - noBtn.offsetWidth - margin;

  newTop = Math.max(margin, Math.min(newTop, maxTop));
  newLeft = Math.max(margin, Math.min(newLeft, maxLeft));

  noBtn.style.position = "fixed";
  noBtn.style.top = newTop + "px";
  noBtn.style.left = newLeft + "px";
}

// 位置リセット
function resetNoPosition() {
  if (!noBtn) return;
  noBtn.style.position = "static";
}

// メール送信
function sendEmail() {
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    message: JSON.stringify(answers, null, 2)
  });
}
