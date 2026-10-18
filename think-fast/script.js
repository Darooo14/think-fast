// Tema berganti urut: Umum, Visual, Digital, Sekolah, Logika (3 putaran = 15 soal)
// Tipe soal (k):
//   "pg"    = pilihan ganda -> o: pilihan, a: indeks benar (mulai 0)
//   "kata"  = lengkapi kata -> v: pola kata berlubang, ans: kata lengkap (yang diketik hanya huruf yang hilang)
//   "isian" = isian singkat -> ans: jawaban yang diterima (boleh lebih dari satu)
// e = pembahasan
const TYPE = {pg:"pilihan ganda", kata:"lengkapi kata", isian:"isian"};

const QUIZ = [
  {t:"Pengetahuan umum", k:"pg", q:"Apa ibu kota Australia?", o:["Sydney","Canberra","Melbourne","Perth"], a:1, e:"Canberra dipilih sebagai ibu kota sebagai kompromi antara Sydney dan Melbourne yang sama-sama ingin jadi ibu kota."},
  {t:"Teka-teki visual", k:"pg", q:"Gambar apa yang melanjutkan pola ini?", v:"🔺 🔵 🔺 🔵 🔺 ❓", o:["🔺","⬛","🔵","⭐"], a:2, e:"Polanya bergantian segitiga dan lingkaran. Setelah 🔺 selalu datang 🔵."},
  {t:"Literasi digital", k:"kata", q:"Lengkapi kata untuk penipuan yang menyamar sebagai pihak tepercaya demi mencuri data lewat tautan palsu.", v:"P _ I S _ I N G", ans:["Phishing"], e:"Phishing adalah penipuan yang menyamar sebagai pihak tepercaya untuk mencuri data seperti PIN dan kata sandi."},
  {t:"Wawasan sekolah", k:"isian", q:"Hari Pendidikan Nasional diperingati setiap tanggal 2 … (tulis nama bulannya).", ans:["Mei"], e:"2 Mei adalah hari lahir Ki Hajar Dewantara, Bapak Pendidikan Nasional. 28 Oktober adalah Sumpah Pemuda dan 25 November adalah Hari Guru."},
  {t:"Logika", k:"pg", q:"Semua kucing adalah hewan. Mimi adalah kucing. Maka…", o:["Mimi bukan hewan","Mimi adalah hewan","Semua hewan adalah kucing","Mimi adalah anjing"], a:1, e:"Mimi termasuk kelompok kucing, dan kelompok kucing termasuk hewan, jadi Mimi adalah hewan."},

  {t:"Pengetahuan umum", k:"isian", q:"Lambang kimia untuk emas adalah …", ans:["Au"], e:"Au berasal dari kata Latin aurum. Ag adalah perak, Fe adalah besi."},
  {t:"Teka-teki visual", k:"pg", q:"Apa kelompok yang melanjutkan pola ini?", v:"🍎 🍌 🍎🍎 🍌🍌 🍎🍎🍎 ❓", o:["🍌","🍌🍌","🍌🍌🍌","🍎🍌"], a:2, e:"Jumlah buah naik satu tiap putaran: 1 apel, 1 pisang, 2 apel, 2 pisang, 3 apel, lalu 3 pisang."},
  {t:"Literasi digital", k:"kata", q:"Lengkapi kata untuk layanan penyimpanan file di internet, seperti Google Drive atau iCloud.", v:"C _ O U _", ans:["Cloud"], e:"Cloud (komputasi awan) menyimpan file di server internet sehingga bisa dibuka dari banyak perangkat."},
  {t:"Wawasan sekolah", k:"kata", q:"Lengkapi semboyan pendidikan: Tut Wuri …", v:"H _ N D _ Y _ N I", ans:["Handayani"], e:"Tut Wuri Handayani berarti di belakang memberi dorongan. Dua semboyan lainnya: Ing Ngarso Sung Tulodo (di depan memberi teladan) dan Ing Madya Mangun Karsa (di tengah membangun semangat)."},
  {t:"Logika", k:"isian", q:"Lanjutkan deret berikut, tulis angkanya: 2, 4, 8, 16, …", ans:["32"], e:"Tiap angka dikali 2, jadi 16 × 2 = 32."},

  {t:"Pengetahuan umum", k:"kata", q:"Lengkapi nama hewan darat tercepat di dunia.", v:"C _ E E _ A H", ans:["Cheetah"], e:"Cheetah bisa berlari sekitar 100 km/jam dalam jarak pendek."},
  {t:"Teka-teki visual", k:"isian", q:"Berapa jumlah bintang ⭐ pada barisan ini? (tulis angkanya)", v:"⭐🌙⭐⭐🌙⭐🌙🌙⭐", ans:["5","lima"], e:"Bintang ada di urutan ke-1, 3, 4, 6, dan 9, jadi totalnya 5. Bulan ada 4."},
  {t:"Literasi digital", k:"pg", q:"Kamu menerima berita mengejutkan di grup chat. Langkah terbaik sebelum membagikannya?", o:["Langsung bagikan agar yang lain tahu","Cek sumbernya dan bandingkan dengan media terpercaya","Bagikan kalau banyak yang sudah membagikan","Tambahkan komentar lalu bagikan"], a:1, e:"Memeriksa sumber mencegah penyebaran hoaks. Banyaknya orang yang membagikan bukan bukti sebuah berita benar."},
  {t:"Wawasan sekolah", k:"kata", q:"Lengkapi nama mata pelajaran yang mempelajari angka, hitungan, dan bangun.", v:"M _ T E M _ T I K _", ans:["Matematika"], e:"Matematika mempelajari bilangan, hitungan, dan bangun, dan diajarkan sejak SD."},
  {t:"Logika", k:"isian", q:"Ali lebih tinggi dari Budi. Budi lebih tinggi dari Cici. Siapa yang paling pendek?", ans:["Cici"], e:"Urutan tinggi: Ali > Budi > Cici, jadi Cici yang paling pendek."}
];

const $ = id => document.getElementById(id);
let qs, answers, cur, deadline, totalMs, tick, startedAt, finished;
let nama = "";

function show(id){ ["start","game","end"].forEach(s => $(s).classList.toggle("hidden", s !== id)); }
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function fmt(s){ const h=Math.floor(s/3600), m=Math.floor(s%3600/60), x=s%60; return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(x).padStart(2,"0"); }

// Huruf yang hilang pada soal "lengkapi kata", mis. "P _ I S _ I N G" menjadi "hh"
function missing(it){
  const w = it.ans[0].toLowerCase();
  return it.v.split(" ").map((t, i) => t === "_" ? w[i] : "").join("");
}

// Bandingkan jawaban isian tanpa peduli huruf besar/kecil, spasi, dan tanda baca
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"");

function isRight(it, a){
  if (a === null) return false;
  if (it.k === "pg") return it.opts[a].ok;
  if (it.k === "kata") return a.toLowerCase() === missing(it);
  return it.ans.some(x => norm(x) === norm(a));
}

function rightText(it){
  if (it.k === "pg") return it.opts.find(o => o.ok).t;
  if (it.k === "kata") return missing(it).toUpperCase().split("").join(" ") + " (" + it.ans[0] + ")";
  return it.ans[0];
}

function givenText(it, a){
  if (it.k === "pg") return it.opts[a].t;
  if (it.k === "kata") return a.split("").map(c => c.trim() ? c.toUpperCase() : "_").join(" ");
  return a;
}

function start(min){
  qs = QUIZ.map(it => it.k === "pg"
    ? {...it, opts: shuffle(it.o.map((t,i) => ({t, ok: i === it.a})))}
    : {...it});
  answers = Array(qs.length).fill(null);
  cur = 0; finished = false;
  totalMs = min * 60000; startedAt = Date.now(); deadline = startedAt + totalMs;
  show("game");
  render();
  updateClock();
  clearInterval(tick);
  tick = setInterval(updateClock, 500);
}

function updateClock(){
  const msLeft = Math.max(0, deadline - Date.now());
  $("clock").textContent = fmt(Math.ceil(msLeft / 1000));
  const low = msLeft < Math.max(60000, totalMs * 0.1);
  $("clock").classList.toggle("low", low);
  $("bar").classList.toggle("low", low);
  $("bar").style.width = (msLeft / totalMs * 100) + "%";
  if (msLeft <= 0 && !finished) finish(true);
}

function renderGrid(){
  const g = $("grid");
  g.innerHTML = "";
  qs.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (answers[i] !== null ? " done" : "") + (i === cur ? " cur" : "");
    d.textContent = i + 1;
    d.setAttribute("aria-label", "Soal " + (i+1) + (answers[i] !== null ? ", sudah dijawab" : ", belum dijawab"));
    d.onclick = () => { cur = i; render(); };
    g.appendChild(d);
  });
}

function render(){
  const it = qs[cur];
  $("no").textContent = "Soal " + (cur+1) + " dari " + qs.length;
  $("theme").textContent = it.t + ": " + TYPE[it.k];
  $("q").textContent = it.q;
  $("vis").classList.toggle("hidden", !it.v);
  $("vis").classList.toggle("kata", it.k === "kata");
  $("vis").textContent = it.v || "";

  const box = $("opts");
  box.innerHTML = "";

  if (it.k === "pg") {
    it.opts.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "opt" + (answers[cur] === i ? " sel" : "");
      b.textContent = o.t;
      b.onclick = () => { answers[cur] = i; render(); };
      box.appendChild(b);
    });

  } else if (it.k === "kata") {
    // satu kotak per huruf yang hilang
    const n = missing(it).length;
    const slots = (answers[cur] || "").padEnd(n, " ").split("");
    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = "Isi huruf yang hilang saja, satu huruf per kotak.";
    const row = document.createElement("div");
    row.className = "letters";
    const boxes = [];
    slots.forEach((c, i) => {
      const inp = document.createElement("input");
      inp.type = "text";
      inp.maxLength = 1;
      inp.className = "letter";
      inp.autocomplete = "off";
      inp.spellcheck = false;
      inp.setAttribute("aria-label", "Huruf yang hilang ke-" + (i+1));
      inp.value = c.trim();
      inp.onfocus = () => inp.select();
      inp.oninput = () => {
        const ch = inp.value.replace(/[^a-zA-Z]/g, "").slice(-1);
        inp.value = ch;
        slots[i] = ch || " ";
        const s = slots.join("");
        answers[cur] = s.trim() ? s : null;
        renderGrid();
        if (ch && boxes[i+1]) boxes[i+1].focus();
      };
      inp.onkeydown = e => {
        if (e.key === "Backspace" && !inp.value && boxes[i-1]) boxes[i-1].focus();
        if (e.key === "Enter" && cur < qs.length - 1) { cur++; render(); }
      };
      boxes.push(inp);
      row.appendChild(inp);
    });
    box.append(hint, row);
    boxes[0].focus({preventScroll:true});

  } else {
    // isian singkat
    const inp = document.createElement("input");
    inp.type = "text";
    inp.className = "answer";
    inp.autocomplete = "off";
    inp.spellcheck = false;
    inp.placeholder = "Ketik jawabanmu";
    inp.setAttribute("aria-label", "Jawaban");
    inp.value = answers[cur] || "";
    inp.oninput = () => { answers[cur] = inp.value.trim() ? inp.value : null; renderGrid(); };
    inp.onkeydown = e => { if (e.key === "Enter" && cur < qs.length - 1) { cur++; render(); } };
    box.appendChild(inp);
    inp.focus({preventScroll:true});
  }

  $("prev").disabled = cur === 0;
  $("nxt").disabled = cur === qs.length - 1;
  renderGrid();
}

function finish(auto){
  if (finished) return;
  if (!auto) {
    const empty = answers.filter(a => a === null).length;
    const msg = empty ? "Masih ada " + empty + " soal belum dijawab. Kumpulkan sekarang?" : "Kumpulkan jawaban sekarang?";
    if (!confirm(msg)) return;
  }
  finished = true;
  clearInterval(tick);
  const used = Math.min(Math.round((Date.now() - startedAt) / 1000), Math.round(totalMs / 1000));
  let correct = 0, wrong = 0, empty = 0;
  const review = $("review");
  review.innerHTML = "";
  qs.forEach((it, i) => {
    const a = answers[i];
    const right = rightText(it);
    const ok = isRight(it, a);
    if (a === null) empty++; else if (ok) correct++; else wrong++;
    const d = document.createElement("div");
    d.className = "rev" + (ok ? " ok" : "");
    const h = document.createElement("h3"); h.textContent = (i+1) + ". " + it.q;
    d.appendChild(h);
    if (it.v) { const v = document.createElement("div"); v.className = "v"; v.textContent = it.v; d.appendChild(v); }
    const tag = document.createElement("div"); tag.className = "tag";
    if (a === null) tag.textContent = "Tidak dijawab. Jawaban benar: " + right;
    else if (ok) tag.textContent = "Benar: " + right;
    else tag.textContent = "Jawabanmu: " + givenText(it, a) + ". Jawaban benar: " + right;
    d.appendChild(tag);
    const e = document.createElement("div"); e.className = "exp"; e.textContent = it.e;
    d.appendChild(e);
    review.appendChild(d);
  });
  const score = Math.round(correct / qs.length * 100);
  show("end");
  $("sum").textContent = nama + ", " + (auto ? "waktu habis, jawabanmu dikumpulkan otomatis." : "jawabanmu sudah dikumpulkan.");
  $("final").textContent = score;
  $("poster").href = "poster.html?nama=" + encodeURIComponent(nama) + "&skor=" + score;
  $("detail").textContent = "Benar " + correct + ", salah " + wrong + ", kosong " + empty + " dari " + qs.length + " soal. Waktu pengerjaan " + fmt(used) + ". Dikerjakan " + new Date().toLocaleString("id-ID", {dateStyle:"medium", timeStyle:"short"}) + ".";
}

document.querySelectorAll("[data-min]").forEach(b => b.onclick = () => {
  const n = $("nama").value.trim();
  if (!n) { $("err").textContent = "Isi nama dulu sebelum mulai."; $("nama").focus(); return; }
  $("err").textContent = "";
  nama = n;
  start(+b.dataset.min);
});
$("prev").onclick = () => { if (cur > 0) { cur--; render(); } };
$("nxt").onclick = () => { if (cur < qs.length - 1) { cur++; render(); } };
$("submit").onclick = () => finish(false);
$("again").onclick = () => { show("start"); window.scrollTo(0, 0); };