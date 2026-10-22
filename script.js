const SUPABASE_URL = "https://ilevxvbgyeobovtvvvwp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZXZ4dmJneWVvYm92dHZ2dndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NzA2NjQsImV4cCI6MjEwODI0NjY0fQ.UvXKtjam2A44R8002Ge1AMXueo_rSxC_HRaxHlzLopU";

let supabaseClient = null;

/* =========================================================
   THINK FAST!!!
   FIXED SCRIPT
   PG + ISIAN + LENGKAPIN HURUF
   TIMER + RANKING + REVIEW
   AUTO CHECK + AUTO NEXT
   LOCK JAWABAN
   ========================================================= */

const QUIZ = [

  /* ================= PILIHAN GANDA ================= */

  {
    theme: "Pengetahuan Umum",
    type: "pg",
    q: "Apa ibu kota Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
    explanation: "Canberra adalah ibu kota Australia."
  },

  {
    theme: "Teka-teki Visual",
    type: "pg",
    q: "Jika pola berikut adalah ▲ ● ▲ ● ▲ ..., bentuk berikutnya adalah?",
    options: ["▲", "●", "■", "★"],
    answer: "●",
    explanation: "Polanya bergantian antara ▲ dan ●."
  },

  {
    theme: "Digital",
    type: "pg",
    q: "Apa kepanjangan dari HTML?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language",
    explanation: "HTML adalah singkatan dari Hyper Text Markup Language."
  },

  {
    theme: "Sekolah",
    type: "pg",
    q: "Berapa hasil dari 12 × 5?",
    options: ["50", "55", "60", "65"],
    answer: "60",
    explanation: "12 × 5 = 60."
  },

  {
    theme: "Logika",
    type: "pg",
    q: "Jika semua A adalah B dan semua B adalah C, maka...",
    options: [
      "Semua C adalah A",
      "Semua A adalah C",
      "Tidak ada A yang C",
      "Sebagian A bukan C"
    ],
    answer: "Semua A adalah C",
    explanation: "Jika A termasuk B dan B termasuk C, maka A juga termasuk C."
  },

  {
    theme: "Pengetahuan Umum",
    type: "pg",
    q: "Planet terbesar dalam tata surya adalah...",
    options: ["Bumi", "Mars", "Jupiter", "Saturnus"],
    answer: "Jupiter",
    explanation: "Jupiter merupakan planet terbesar di tata surya."
  },

  {
    theme: "Teka-teki Visual",
    type: "pg",
    q: "Apel, jeruk, apel, jeruk, apel, ... Apa berikutnya?",
    options: ["Apel", "Jeruk", "Pisang", "Mangga"],
    answer: "Jeruk",
    explanation: "Polanya bergantian antara apel dan jeruk."
  },

  {
    theme: "Digital",
    type: "pg",
    q: "Bahasa yang digunakan untuk membuat struktur halaman web adalah...",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "HTML",
    explanation: "HTML digunakan untuk membuat struktur halaman web."
  },

  {
    theme: "Sekolah",
    type: "pg",
    q: "Berapa jumlah sisi pada segitiga?",
    options: ["2", "3", "4", "5"],
    answer: "3",
    explanation: "Segitiga memiliki tiga sisi."
  },

  {
    theme: "Logika",
    type: "pg",
    q: "Jika hari ini Senin, maka 3 hari lagi adalah...",
    options: ["Selasa", "Rabu", "Kamis", "Jumat"],
    answer: "Kamis",
    explanation: "Senin → Selasa → Rabu → Kamis."
  },

  {
    theme: "Pengetahuan Umum",
    type: "pg",
    q: "Hewan yang dikenal sebagai raja hutan adalah...",
    options: ["Harimau", "Singa", "Serigala", "Beruang"],
    answer: "Singa",
    explanation: "Singa sering disebut sebagai raja hutan."
  },

  {
    theme: "Teka-teki Visual",
    type: "pg",
    q: "Jika 2 + 2 = 4 dan 4 + 4 = 8, maka 8 + 8 = ...",
    options: ["12", "14", "16", "18"],
    answer: "16",
    explanation: "8 + 8 = 16."
  },

  {
    theme: "Digital",
    type: "pg",
    q: "CSS biasanya digunakan untuk...",
    options: [
      "Mengatur tampilan website",
      "Menyimpan database",
      "Mengirim email",
      "Mengedit video"
    ],
    answer: "Mengatur tampilan website",
    explanation: "CSS digunakan untuk mengatur tampilan dan desain halaman web."
  },

  {
    theme: "Sekolah",
    type: "pg",
    q: "Bahasa resmi negara Indonesia adalah...",
    options: [
      "Bahasa Jawa",
      "Bahasa Sunda",
      "Bahasa Indonesia",
      "Bahasa Melayu"
    ],
    answer: "Bahasa Indonesia",
    explanation: "Bahasa Indonesia merupakan bahasa resmi Indonesia."
  },

  {
    theme: "Logika",
    type: "pg",
    q: "Mana yang berbeda dari yang lainnya?",
    options: ["2", "4", "6", "9"],
    answer: "9",
    explanation: "2, 4, dan 6 adalah bilangan genap, sedangkan 9 adalah bilangan ganjil."
  },


  /* ================= ISIAN ================= */

  {
    theme: "Isian Singkat",
    type: "isian",
    q: "Planet tempat manusia tinggal adalah...",
    answer: "Bumi",
    explanation: "Manusia tinggal di planet Bumi."
  },

  {
    theme: "Isian Singkat",
    type: "isian",
    q: "Berapa hasil dari 10 + 15?",
    answer: "25",
    explanation: "10 + 15 = 25."
  },

  {
    theme: "Isian Singkat",
    type: "isian",
    q: "Apa nama satelit alami Bumi?",
    answer: "Bulan",
    explanation: "Bulan adalah satelit alami Bumi."
  },

  {
    theme: "Isian Singkat",
    type: "isian",
    q: "Hewan yang sering disebut raja hutan adalah...",
    answer: "Singa",
    explanation: "Singa sering disebut sebagai raja hutan."
  },

  {
    theme: "Isian Singkat",
    type: "isian",
    q: "Dalam satu minggu ada berapa hari?",
    answer: "7",
    explanation: "Satu minggu terdiri dari 7 hari."
  },


  /* ================= LENGKAPIN HURUF ================= */

  {
    theme: "Lengkapin Huruf",
    type: "lengkap",
    q: "Lengkapi kata berikut: M _ T A H A R I",
    answer: "A",
    explanation: "Kata lengkapnya adalah MATAHARI."
  },

  {
    theme: "Lengkapin Huruf",
    type: "lengkap",
    q: "Lengkapi kata berikut: S E K _ L A H",
    answer: "O",
    explanation: "Kata lengkapnya adalah SEKOLAH."
  },

  {
    theme: "Lengkapin Huruf",
    type: "lengkap",
    q: "Lengkapi kata berikut: K _ M P U T E R",
    answer: "O",
    explanation: "Kata lengkapnya adalah KOMPUTER."
  },

  {
    theme: "Lengkapin Huruf",
    type: "lengkap",
    q: "Lengkapi kata berikut: I N D O N _ S I A",
    answer: "E",
    explanation: "Kata lengkapnya adalah INDONESIA."
  },

  {
    theme: "Lengkapin Huruf",
    type: "lengkap",
    q: "Lengkapi kata berikut: K R E A T _ F",
    answer: "I",
    explanation: "Kata lengkapnya adalah KREATIF."
  }

];


/* =========================================================
   STATE
   ========================================================= */

let qs = [];
let answers = [];
let locked = [];

let cur = 0;

let participantName = "";
let selectedMinutes = null;

let totalMs = 0;
let startedAt = 0;

let tick = null;
let autoNextTimer = null;

let finished = false;

const RANKING_LIMIT = 100;


/* =========================================================
   HELPER
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}


function normalizeAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}


function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] =
      [copy[j], copy[i]];
  }

  return copy;
}


function fmt(ms) {
  const total =
    Math.max(0, Math.floor(ms / 1000));

  const minutes =
    Math.floor(total / 60);

  const seconds =
    total % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   SHOW SECTION
   ========================================================= */

function show(id) {

  document
    .querySelectorAll("section")
    .forEach(section => {
      section.classList.add("hidden");
    });

  const target = $(id);

  if (target) {
    target.classList.remove("hidden");
  }
}


/* =========================================================
   SUPABASE
   ========================================================= */

function initSupabase() {

  if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
  ) {

    supabaseClient =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
      );

    console.log(
      "Supabase berhasil terhubung."
    );

  } else {

    console.error(
      "Supabase CDN belum tersedia."
    );

  }
}


/* =========================================================
   SAVE RANKING
   ========================================================= */

async function saveRanking(entry) {

  if (!supabaseClient) {
    console.error(
      "Supabase client belum siap."
    );

    return false;
  }

  try {

    const { error } =
      await supabaseClient
        .from("think_fast_ranking")
        .insert({
          name:
            String(
              entry.name || ""
            )
              .trim()
              .slice(0, 40),

          score:
            Number(entry.score) || 0,

          correct:
            Number(entry.correct) || 0,

          wrong:
            Number(entry.wrong) || 0,

          empty:
            Number(entry.empty) || 0,

          time_seconds:
            Math.max(
              0,
              Math.floor(
                (Number(entry.time) || 0) / 1000
              )
            )
        });

    if (error) {

      console.error(
        "Gagal menyimpan ranking Supabase:",
        error
      );

      return false;
    }

    console.log(
      "Ranking berhasil disimpan ke Supabase."
    );

    return true;

  } catch (error) {

    console.error(
      "Supabase ranking error:",
      error
    );

    return false;
  }
}


/* =========================================================
   GET RANKING
   ========================================================= */

async function getRanking() {

  if (!supabaseClient) {

    console.error(
      "Supabase client belum siap."
    );

    return [];
  }

  try {

    const { data, error } =
      await supabaseClient
        .from("think_fast_ranking")
        .select(
          "id,name,score,correct,wrong,empty,time_seconds,created_at"
        )
        .order(
          "score",
          {
            ascending: false
          }
        )
        .order(
          "time_seconds",
          {
            ascending: true
          }
        )
        .limit(RANKING_LIMIT);

    if (error) {

      console.error(
        "Gagal mengambil ranking Supabase:",
        error
      );

      return [];
    }

    return Array.isArray(data)
      ? data
      : [];

  } catch (error) {

    console.error(
      "Supabase ranking error:",
      error
    );

    return [];
  }
}


/* =========================================================
   START
   ========================================================= */

function start(minutes) {

  participantName =
    ($("nama")?.value || "")
      .trim();

  if (!participantName) {

    if ($("err")) {
      $("err").textContent =
        "Masukkan nama terlebih dahulu.";
    }

    $("nama")?.focus();

    return;
  }


  if (!minutes) {

    if ($("err")) {
      $("err").textContent =
        "Pilih durasi terlebih dahulu.";
    }

    return;
  }


  selectedMinutes =
    Number(minutes);

  totalMs =
    selectedMinutes *
    60 *
    1000;


  qs =
    shuffle(QUIZ).map(question => {

      const copy = {
        ...question
      };

      if (copy.type === "pg") {
        copy.options =
          shuffle(copy.options);
      }

      return copy;

    });


  answers =
    new Array(qs.length)
      .fill(null);

  locked =
    new Array(qs.length)
      .fill(false);

  cur = 0;

  finished = false;

  startedAt =
    Date.now();


  if (autoNextTimer) {

    clearTimeout(
      autoNextTimer
    );

    autoNextTimer = null;
  }


  clearInterval(tick);

  tick =
    setInterval(
      updateTimer,
      250
    );


  updateTimer();

  show("game");

  render();

  window.scrollTo(
    0,
    0
  );
}


/* =========================================================
   TIMER
   ========================================================= */

function updateTimer() {

  if (finished) {
    return;
  }

  const elapsed =
    Date.now() - startedAt;

  const remaining =
    Math.max(
      0,
      totalMs - elapsed
    );


  const timer =
    $("timer");

  if (timer) {
    timer.textContent =
      fmt(remaining);
  }


  if (remaining <= 0) {
    finish(true);
  }
}


/* =========================================================
   GRID
   ========================================================= */

function renderGrid() {

  const grid =
    $("grid");

  if (!grid) {
    return;
  }

  grid.innerHTML = "";


  qs.forEach(
    (question, index) => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "dot";

      button.textContent =
        index + 1;


      if (index === cur) {
        button.classList.add(
          "cur"
        );
      }


      if (locked[index]) {

        button.classList.add(
          "done"
        );

        button.classList.add(
          "locked"
        );
      }


      button.addEventListener(
        "click",
        () => {

          if (autoNextTimer) {
            return;
          }

          cur = index;

          render();

          window.scrollTo(
            0,
            0
          );

        }
      );


      grid.appendChild(
        button
      );

    }
  );
}


/* =========================================================
   RENDER
   ========================================================= */

function render() {

  const question =
    qs[cur];

  if (!question) {
    return;
  }


  if ($("no")) {
    $("no").textContent =
      `Soal ${cur + 1} / ${qs.length}`;
  }


  if ($("theme")) {
    $("theme").textContent =
      question.theme;
  }


  if ($("q")) {
    $("q").textContent =
      question.q;
  }


  if ($("vis")) {
    $("vis").classList.add(
      "hidden"
    );
  }


  const opts =
    $("opts");

  if (!opts) {
    return;
  }

  opts.innerHTML = "";


  /* =====================================================
     PILIHAN GANDA
     ===================================================== */

  if (question.type === "pg") {

    question.options.forEach(
      option => {

        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "opt";

        button.textContent =
          option;


        if (
          normalizeAnswer(
            answers[cur]
          ) ===
          normalizeAnswer(
            option
          )
        ) {

          button.classList.add(
            "sel"
          );
        }


        if (locked[cur]) {

          button.disabled =
            true;

          button.style.cursor =
            "not-allowed";

          button.style.pointerEvents =
            "none";

          button.style.opacity =
            normalizeAnswer(
              answers[cur]
            ) ===
            normalizeAnswer(
              option
            )
              ? "1"
              : ".55";
        }


        button.addEventListener(
          "click",
          () => {

            if (
              autoNextTimer ||
              locked[cur]
            ) {
              return;
            }


            answers[cur] =
              option;

            locked[cur] =
              true;


            render();

            advanceAfterAnswer();

          }
        );


        opts.appendChild(
          button
        );

      }
    );

  }


  /* =====================================================
     ISIAN
     ===================================================== */

  else if (
    question.type === "isian"
  ) {

    renderInputQuestion(
      question,
      "Ketik jawaban kamu..."
    );

  }


  /* =====================================================
     LENGKAP
     ===================================================== */

  else if (
    question.type === "lengkap"
  ) {

    renderInputQuestion(
      question,
      "Lengkapi kata tersebut..."
    );

  }


  renderGrid();


  if (
    answers[cur] !== null &&
    answers[cur] !== undefined &&
    normalizeAnswer(
      answers[cur]
    ) !== ""
  ) {

    showAnswerFeedback(
      question,
      answers[cur]
    );
  }
}


/* =========================================================
   INPUT QUESTION
   ========================================================= */

function renderInputQuestion(
  question,
  placeholder
) {

  const opts =
    $("opts");

  if (!opts) {
    return;
  }


  opts.innerHTML = "";


  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.style.cssText = `
    width:100%;
    display:block;
    position:relative;
    z-index:9999;
    pointer-events:auto;
  `;


  const label =
    document.createElement(
      "div"
    );

  label.textContent =
    "Ketik jawaban kamu:";

  label.style.cssText = `
    display:block;
    color:#fff;
    font-size:16px;
    margin-bottom:10px;
    pointer-events:none;
  `;


  const input =
    document.createElement(
      "input"
    );

  input.type =
    "text";

  input.className =
    "quiz-input";

  input.autocomplete =
    "off";

  input.spellcheck =
    false;

  input.placeholder =
    placeholder ||
    "Tulis jawaban...";

  input.value =
    answers[cur] || "";

  input.readOnly =
    locked[cur] === true;


  input.style.setProperty(
    "display",
    "block",
    "important"
  );

  input.style.setProperty(
    "width",
    "100%",
    "important"
  );

  input.style.setProperty(
    "height",
    "55px",
    "important"
  );

  input.style.setProperty(
    "padding",
    "14px 16px",
    "important"
  );

  input.style.setProperty(
    "box-sizing",
    "border-box",
    "important"
  );

  input.style.setProperty(
    "font-size",
    "18px",
    "important"
  );

  input.style.setProperty(
    "font-family",
    "inherit",
    "important"
  );

  input.style.setProperty(
    "color",
    "#ffffff",
    "important"
  );

  input.style.setProperty(
    "-webkit-text-fill-color",
    "#ffffff",
    "important"
  );

  input.style.setProperty(
    "caret-color",
    "#ffffff",
    "important"
  );

  input.style.setProperty(
    "background",
    "#111111",
    "important"
  );

  input.style.setProperty(
    "border",
    "2px solid #ffffff",
    "important"
  );

  input.style.setProperty(
    "border-radius",
    "10px",
    "important"
  );

  input.style.setProperty(
    "outline",
    "none",
    "important"
  );

  input.style.setProperty(
    "opacity",
    "1",
    "important"
  );

  input.style.setProperty(
    "position",
    "relative",
    "important"
  );

  input.style.setProperty(
    "z-index",
    "10000",
    "important"
  );

  input.style.setProperty(
    "pointer-events",
    "auto",
    "important"
  );


  input.addEventListener(
    "input",
    () => {

      if (locked[cur]) {
        return;
      }

      answers[cur] =
        input.value;

    }
  );


  input.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Enter"
      ) {
        return;
      }

      event.preventDefault();


      if (
        locked[cur] ||
        autoNextTimer
      ) {
        return;
      }


      const value =
        normalizeAnswer(
          input.value
        );


      if (!value) {
        return;
      }


      answers[cur] =
        input.value;

      locked[cur] =
        true;


      render();


      setTimeout(
        () => {
          advanceAfterAnswer();
        },
        800
      );

    }
  );


  wrapper.appendChild(
    label
  );

  wrapper.appendChild(
    input
  );

  opts.appendChild(
    wrapper
  );


  opts.style.setProperty(
    "pointer-events",
    "auto",
    "important"
  );

  opts.style.setProperty(
    "position",
    "relative",
    "important"
  );

  opts.style.setProperty(
    "z-index",
    "9999",
    "important"
  );


  if (!locked[cur]) {

    setTimeout(
      () => {

        if (
          document.body.contains(
            input
          )
        ) {

          input.focus();

          input.setSelectionRange(
            input.value.length,
            input.value.length
          );

        }

      },
      100
    );

  }
}


/* =========================================================
   ANSWER CHECK
   ========================================================= */

function isRight(
  question,
  answer
) {

  if (
    !question ||
    answer === null ||
    answer === undefined
  ) {
    return false;
  }


  const user =
    normalizeAnswer(
      answer
    );

  const correct =
    normalizeAnswer(
      question.answer
    );


  if (
    !user ||
    !correct
  ) {
    return false;
  }


  return user === correct;
}


/* =========================================================
   AUTO NEXT
   ========================================================= */

function advanceAfterAnswer() {

  if (autoNextTimer) {
    return;
  }


  autoNextTimer =
    setTimeout(
      () => {

        autoNextTimer =
          null;


        if (finished) {
          return;
        }


        if (
          cur <
          qs.length - 1
        ) {

          cur++;

          render();

          window.scrollTo(
            0,
            0
          );

        } else {

          finish(false);

        }

      },
      800
    );
}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showAnswerFeedback(
  question,
  answer
) {

  const opts =
    $("opts");

  if (
    !opts ||
    !question
  ) {
    return;
  }


  const old =
    opts.querySelector(
      ".answer-feedback"
    );


  if (old) {
    old.remove();
  }


  const feedback =
    document.createElement(
      "div"
    );

  feedback.className =
    "answer-feedback";


  if (
    isRight(
      question,
      answer
    )
  ) {

    feedback.innerHTML = `
      <strong>✓ BENAR!</strong>
      <span>Jawaban kamu tepat.</span>
    `;

    feedback.classList.add(
      "correct"
    );

  } else {

    feedback.innerHTML = `
      <strong>✗ SALAH!</strong>
      <span>
        Jawaban yang benar:
        <b>${escapeHtml(
          question.answer
        )}</b>
      </span>
    `;

    feedback.classList.add(
      "wrong"
    );
  }


  opts.appendChild(
    feedback
  );

  addFeedbackStyles();
}


/* =========================================================
   FEEDBACK STYLE
   ========================================================= */

function addFeedbackStyles() {

  if (
    document.getElementById(
      "thinkFastFeedbackStyles"
    )
  ) {
    return;
  }


  const style =
    document.createElement(
      "style"
    );

  style.id =
    "thinkFastFeedbackStyles";


  style.textContent = `

    .answer-feedback {
      width:100%;
      box-sizing:border-box;
      margin-top:16px;
      padding:14px 16px;
      border-radius:14px;
      display:flex;
      flex-direction:column;
      gap:4px;
      font-size:15px;
      line-height:1.45;
      animation:
        thinkFastFeedbackIn
        .2s ease;
    }

    .answer-feedback strong {
      font-size:18px;
      letter-spacing:.4px;
    }

    .answer-feedback.correct {
      background:
        rgba(60,220,120,.12);
      border:
        1px solid
        rgba(60,220,120,.35);
    }

    .answer-feedback.wrong {
      background:
        rgba(255,80,80,.12);
      border:
        1px solid
        rgba(255,80,80,.35);
    }

    @keyframes thinkFastFeedbackIn {

      from {
        opacity:0;
        transform:translateY(5px);
      }

      to {
        opacity:1;
        transform:translateY(0);
      }

    }

  `;


  document.head.appendChild(
    style
  );
}


/* =========================================================
   INPUT STYLE
   ========================================================= */

function addInputStyles() {

  if (
    document.getElementById(
      "thinkFastInputStyles"
    )
  ) {
    return;
  }


  const style =
    document.createElement(
      "style"
    );

  style.id =
    "thinkFastInputStyles";


  style.textContent = `

    .quiz-input {
      width:100%;
      box-sizing:border-box;
      padding:16px 18px;
      border-radius:14px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(255,255,255,.05);
      color:#fff;
      outline:none;
      font-size:17px;
      font-family:inherit;
      transition:.2s ease;
    }

    .quiz-input::placeholder {
      color:rgba(255,255,255,.42);
    }

    .quiz-input:focus {
      border-color:
        rgba(255,255,255,.55);

      background:
        rgba(255,255,255,.08);

      box-shadow:
        0 0 0 3px
        rgba(255,255,255,.06);
    }

    .quiz-input:disabled {
      opacity:.7;
      cursor:not-allowed;
    }

  `;


  document.head.appendChild(
    style
  );
}


/* =========================================================
   FINISH
   ========================================================= */

async function finish(
  auto = false
) {

  if (finished) {
    return;
  }


  if (!auto) {

    const yes =
      confirm(
        "Yakin ingin mengumpulkan kuis?"
      );

    if (!yes) {
      return;
    }
  }


  finished = true;


  if (autoNextTimer) {

    clearTimeout(
      autoNextTimer
    );

    autoNextTimer =
      null;
  }


  clearInterval(tick);


  let correct = 0;
  let wrong = 0;
  let empty = 0;


  qs.forEach(
    (question, index) => {

      const answer =
        answers[index];


      if (
        answer === null ||
        answer === undefined ||
        normalizeAnswer(
          answer
        ) === ""
      ) {

        empty++;

      }

      else if (
        isRight(
          question,
          answer
        )
      ) {

        correct++;

      }

      else {

        wrong++;

      }

    }
  );


  const score =
    Math.round(
      (correct / qs.length) *
      100
    );


  const usedMs =
    Math.min(
      totalMs,
      Date.now() -
      startedAt
    );


  const rankingSaved =
    await saveRanking({

      name:
        participantName,

      score:
        score,

      correct:
        correct,

      wrong:
        wrong,

      empty:
        empty,

      time:
        usedMs

    });


  if (!rankingSaved) {

    console.warn(
      "Skor selesai, tetapi gagal dikirim ke ranking global."
    );

  }


  if ($("sum")) {

    $("sum").textContent =
      `${correct} benar • ${wrong} salah • ${empty} kosong`;

  }


  if ($("finalName")) {

    $("finalName").textContent =
      participantName;

  }


  if ($("final")) {

    $("final").textContent =
      score;

  }


  if ($("detail")) {

    $("detail").textContent =
      `Waktu pengerjaan: ${fmt(
        usedMs
      )}`;

  }


  renderReview();

  show("end");

  window.scrollTo(
    0,
    0
  );
}


/* =========================================================
   REVIEW
   ========================================================= */

function renderReview() {

  const review =
    $("review");

  if (!review) {
    return;
  }


  review.innerHTML = "";


  qs.forEach(
    (question, index) => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "rev";


      const userAnswer =
        answers[index];


      const empty =
        !userAnswer ||
        normalizeAnswer(
          userAnswer
        ) === "";


      const correct =
        !empty &&
        isRight(
          question,
          userAnswer
        );


      if (correct) {

        item.classList.add(
          "ok"
        );

      }


      const number =
        document.createElement(
          "div"
        );

      number.textContent =
        `${index + 1}.`;


      const content =
        document.createElement(
          "div"
        );


      const title =
        document.createElement(
          "div"
        );

      title.textContent =
        question.q;


      const answer =
        document.createElement(
          "div"
        );


      answer.innerHTML =
        empty
          ? `<span>Jawaban: Kosong</span>`
          : `<span>Jawaban kamu: <b>${escapeHtml(
              userAnswer
            )}</b></span>`;


      content.appendChild(
        title
      );

      content.appendChild(
        answer
      );


      if (
        !correct &&
        !empty
      ) {

        const correctAnswer =
          document.createElement(
            "div"
          );

        correctAnswer.innerHTML =
          `Jawaban benar: <b>${escapeHtml(
            question.answer
          )}</b>`;


        content.appendChild(
          correctAnswer
        );

      }


      item.appendChild(
        number
      );

      item.appendChild(
        content
      );


      review.appendChild(
        item
      );

    }
  );
}


/* =========================================================
   RANKING
   ========================================================= */

async function renderRanking() {

  const list =
    $("rankingList");

  if (!list) {
    return;
  }


  list.innerHTML = "";


  const loading =
    document.createElement(
      "div"
    );

  loading.className =
    "rank-row";

  loading.textContent =
    "Memuat ranking global...";


  list.appendChild(
    loading
  );


  const ranking =
    await getRanking();


  list.innerHTML = "";


  if (
    ranking.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );

    empty.className =
      "rank-row";

    empty.textContent =
      "Belum ada ranking.";


    list.appendChild(
      empty
    );

    return;
  }


  ranking.forEach(
    (entry, index) => {

      const row =
        document.createElement(
          "div"
        );

      row.className =
        "rank-row";


      const number =
        document.createElement(
          "div"
        );

      number.className =
        "rank-number";

      number.textContent =
        index + 1;


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "rank-info";


      const name =
        document.createElement(
          "strong"
        );

      name.textContent =
        entry.name ||
        "Tanpa nama";


      const detail =
        document.createElement(
          "span"
        );

      detail.textContent =
        `${Number(entry.correct) || 0} benar • ${Number(entry.wrong) || 0} salah • ${Number(entry.empty) || 0} kosong`;


      info.appendChild(
        name
      );

      info.appendChild(
        detail
      );


      const score =
        document.createElement(
          "div"
        );

      score.className =
        "rank-score";

      score.textContent =
        `${Number(entry.score) || 0}%`;


      row.appendChild(
        number
      );

      row.appendChild(
        info
      );

      row.appendChild(
        score
      );


      list.appendChild(
        row
      );

    }
  );
}


/* =========================================================
   INIT
   ========================================================= */

function initThinkFast() {

  console.log(
    "THINK FAST!!! initializing..."
  );


  initSupabase();

  addInputStyles();

  addFeedbackStyles();


  /* ================= DURASI ================= */

  document
    .querySelectorAll(
      ".duration-btn"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const minutes =
              Number(
                button.dataset.min
              );


            selectedMinutes =
              minutes;


            document
              .querySelectorAll(
                ".duration-btn"
              )
              .forEach(
                btn => {

                  btn.classList.remove(
                    "selected"
                  );

                }
              );


            button.classList.add(
              "selected"
            );


            if (
              $("selectedTime")
            ) {

              $("selectedTime")
                .textContent =
                `Durasi dipilih: ${minutes} menit`;

            }


            if ($("err")) {
              $("err").textContent =
                "";
            }


            const startButton =
              $("startQuiz");


            if (
              startButton
            ) {

              startButton.disabled =
                false;

              startButton.style.pointerEvents =
                "auto";

            }

          }
        );

      }
    );


  /* ================= START BUTTON ================= */

  const startButton =
    $("startQuiz");


  if (startButton) {

    startButton.addEventListener(
      "click",
      () => {

        start(
          selectedMinutes
        );

      }
    );

  }


  /* ================= NAMA ================= */

  if ($("nama")) {

    $("nama").addEventListener(
      "keydown",
      event => {

        if (
          event.key !== "Enter"
        ) {
          return;
        }


        event.preventDefault();


        if (!selectedMinutes) {

          if ($("err")) {

            $("err").textContent =
              "Pilih durasi terlebih dahulu.";

          }

          return;
        }


        start(
          selectedMinutes
        );

      }
    );

  }


  /* ================= SEBELUMNYA ================= */

  if ($("prev")) {

    $("prev").addEventListener(
      "click",
      () => {

        if (autoNextTimer) {
          return;
        }


        if (cur > 0) {

          cur--;

          render();

          window.scrollTo(
            0,
            0
          );

        }

      }
    );

  }


  /* ================= BERIKUTNYA ================= */

  if ($("nxt")) {

    $("nxt").addEventListener(
      "click",
      () => {

        if (autoNextTimer) {
          return;
        }


        if (
          cur <
          qs.length - 1
        ) {

          cur++;

          render();

          window.scrollTo(
            0,
            0
          );

        }

      }
    );

  }


  /* ================= SUBMIT ================= */

  const submitButton =
    $("submit");


  if (submitButton) {

    submitButton.style.display =
      "none";

    submitButton.disabled =
      true;

  }


  /* ================= PAPAN RANKING ================= */

  if ($("rankingBtn")) {

    $("rankingBtn").addEventListener(
      "click",
      async () => {

        show("ranking");

        window.scrollTo(
          0,
          0
        );

        await renderRanking();

      }
    );

  }


  /* ================= RANKING DARI HASIL ================= */

  if ($("resultRanking")) {

    $("resultRanking").addEventListener(
      "click",
      async () => {

        show("ranking");

        window.scrollTo(
          0,
          0
        );

        await renderRanking();

      }
    );

  }


  /* ================= KEMBALI KE START ================= */

  if ($("backStart")) {

    $("backStart").addEventListener(
      "click",
      () => {

        clearInterval(
          tick
        );


        finished =
          false;


        if (autoNextTimer) {

          clearTimeout(
            autoNextTimer
          );

          autoNextTimer =
            null;

        }


        show("start");

        window.scrollTo(
          0,
          0
        );

      }
    );

  }


  /* ================= RESET RANKING ================= */

  if ($("resetRanking")) {

    $("resetRanking").addEventListener(
      "click",
      () => {

        const yes =
          confirm(
            "Hapus semua ranking?"
          );


        if (!yes) {
          return;
        }


        alert(
          "Ranking global dikelola melalui Supabase Table Editor."
        );


        renderRanking();

      }
    );

  }


  /* ================= MAIN LAGI ================= */

  if ($("againEnd")) {

    $("againEnd").addEventListener(
      "click",
      () => {

        clearInterval(
          tick
        );


        finished =
          false;


        if (autoNextTimer) {

          clearTimeout(
            autoNextTimer
          );

          autoNextTimer =
            null;

        }


        show("start");

        window.scrollTo(
          0,
          0

        );

      }
    );

  }


  /* ================= START ================= */

  show("start");


  console.log(
    "THINK FAST!!! berhasil dimuat."
  );

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initThinkFast
  );

} else {

  initThinkFast();

}