// EmailJS初期化
(function(){
  emailjs.init("JGZt53LQJjdb0E3KF");
})();

// 正解データ
const correct = {
  bm: "4",
  bd: "13",
  bfamily: ["葛󠄀谷","葛谷"],
  bname: "雄斗",
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

// No押したときのメッセージ
const noMessages = [
  "嘘はダメだよ？",
  "誓うよね？",
  "殺すよ？"
];

let answers = [];
let current = 0;
let noBtn;

// 初期化
window.addEventListener("DOMContentLoaded", () => {
  noBtn = document.getElementById("noBtn");

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
        document.getElementById("error").innerText = "入力内容が間違っています";
        return;
      }
    } else {
      if (input !== answer) {
        document.getElementById("error").innerText = "入力内容が間違っています";
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

// Noクリック（全質問共通：確認ダイアログ）
function handleNoClick() {
  alert(noMessages[current]);
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
