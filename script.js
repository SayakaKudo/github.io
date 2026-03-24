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
  "紗華とずっと一緒にいると誓う？",
  "結婚する？"
];

let answers = [];
let current = 0;

// ログイン処理
function login() {
  const fields = ["by","bm","bd","bfamily","bname","gy","gm","gd","gfamily","gname"];

  for (let f of fields) {
    const input = document.getElementById(f).value.trim();
    if (input !== correct[f]) {
      document.getElementById("error").innerText = "入力内容が間違っています";
      return;
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

// 回答処理
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

// Noボタン逃げる（DOM読み込み後に設定）
window.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");

  noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.top = Math.random() * 300 + "px";
    noBtn.style.left = Math.random() * 300 + "px";
  });
});

// メール送信
function sendEmail() {
  emailjs.send("service_iufbcty", "template_ueeov56", {
    message: JSON.stringify(answers, null, 2)
  });
}
