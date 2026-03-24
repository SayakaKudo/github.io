// EmailJS初期化
(function(){
  emailjs.init("JGZt53LQJjdb0E3KF");
})();

// 正解データ
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

// 質問
const questions = [
  "紗華のことが好き？",
  "紗華とずっと一緒にいることを誓う？",
  "紗華と結婚する？"
];

let answers = [];
let current = 0;
let noBtn;
let noTimeout = null;

// 初期化
window.addEventListener("DOMContentLoaded", () => {
  noBtn = document.getElementById("noBtn");

  resetNoPosition();

  noBtn.addEventListener("click", handleNoClick);

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

  // Yesサイズリセット
  const yesBtn = document.querySelector(".yes");
  if (yesBtn) {
    yesBtn.style.transform = "scale(1)";
  }

  // No状態リセット
  if (noBtn) {
    noBtn.style.opacity = "1";
    noBtn.style.pointerEvents = "auto";
  }
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

// Noクリック処理
function handleNoClick() {

  // Q1：消えて再出現（安定版）
  if (current === 0) {

    if (noTimeout) clearTimeout(noTimeout);

    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";

    noTimeout = setTimeout(() => {
      const x = Math.random() * (window.innerWidth - 120);
      const y = Math.random() * (window.innerHeight - 50);

      noBtn.style.position = "fixed";
      noBtn.style.left = x + "px";
      noBtn.style.top = y + "px";

      noBtn.style.opacity = "1";
      noBtn.style.pointerEvents = "auto";
    }, 1500);
  }

  // Q2：無限確認
  else if (current === 1) {
    alert("本当に？");
  }

  // Q3：Yes巨大化（蓄積型）
  else if (current === 2) {
    const yesBtn = document.querySelector(".yes");

    const currentScale = yesBtn.style.transform.match(/scale\\(([^)]+)\\)/);
    const base = currentScale ? parseFloat(currentScale[1]) : 1;

    const next = base * 1.2;

    yesBtn.style.transform = `scale(${next})`;
  }
}

// 位置リセット
function resetNoPosition() {
  if (!noBtn) return;
  noBtn.style.position = "static";
}

// メール送信
function sendEmail() {
  let formatted = "";

  answers.forEach((item, index) => {
    formatted += `Q${index + 1}: ${item.q}\n`;
    formatted += `回答: ${item.a === "yes" ? "Yes" : "No"}\n\n`;
  });

  emailjs.send("service_iufbcty", "template_ueeov56", {
    message: formatted
  });
}
