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
  const fields = ["bm","bd","bfamily","bname","gm","gd","gfamily","gname"];

  for (let f of fields) {
    const el = document.getElementById(f);

    if (!el) {
      console.error("IDが存在しない:", f);
      return;
    }

    const input = el.value.trim();
    const answer = correct[f];

    if (Array.isArray(answer)) {
      if (!answer.includes(input)) return error();
    } else {
      if (input !== answer) return error();
    }
  }
  document.getElementById("login").classList.add("hidden");
  document.getElementById("question").classList.remove("hidden");
  showQuestion();
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
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

    sendEmail().then(() => {
      // 送信完了後に遷移
      document.getElementById("question").classList.add("hidden");
      document.getElementById("done").classList.remove("hidden");
    }).catch(() => {
      alert("送信に失敗しました");
    });

  } else {
    showQuestion();
  }
}

function showModal(text) {
  document.getElementById("modalText").innerText = text;
  document.getElementById("modal").classList.remove("hidden");
}

// Noクリック（全質問共通：確認ダイアログ）
function handleNoClick() {
  showModal(noMessages[current]);
}

// メール送信
function sendEmail() {
  let text = "";

  answers.forEach((v,i)=>{
    text += `Q${i+1}: ${v.q}\n回答: ${v.a}\n\n`;
  });

  return emailjs.send("service_iufbcty", "template_ueeov56", {
    message: text
  });
}
