// EmailJS初期化
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

// 正解データ
const correct = {
  by: "1995",
  bm: "1",
  bd: "1",
  bfamily: "山田",
  bname: "太郎",
  gfamily: "佐藤",
  gname: "花子"
};

// 質問
const questions = [
  "私のこと好き？",
  "ずっと一緒にいたい？",
  "結婚する？"
];

let answers = [];
let current = 0;

// ログイン
function login() {
  const fields = ["by","bm","bd","bfamily","bname","gfamily","gname"];
  for (let f of fields) {
    if (document.getElementById(f).value !== correct[f]) {
      document.getElementById("error").innerText = "入力が違います";
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

// Noボタン逃げる
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.position = "absolute";
  noBtn.style.top = Math.random()*300 + "px";
  noBtn.style.left = Math.random()*300 + "px";
});

// メール送信
function sendEmail() {
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    message: JSON.stringify(answers)
  });
}
