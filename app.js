// Pilah — logika aplikasi. JavaScript polos, tanpa dependensi.
// Bagian: panduan (cari + filter + modal detail), kuis, kalkulator dampak.

(function () {
  "use strict";

  // ---------- bantuan ----------
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ---------- PANDUAN ----------
  var state = { query: "", filter: "all" };

  function itemCard(item) {
    var c = CATEGORIES[item.cat];
    var card = el("button", "item-card");
    card.type = "button";
    var dot = el("span", "dot");
    dot.style.background = c.color;
    card.appendChild(dot);
    card.appendChild(el("span", "item-name", item.name));
    var tag = el("span", "item-tag", c.label);
    tag.style.color = c.color;
    tag.style.borderColor = c.color;
    card.appendChild(tag);
    card.addEventListener("click", function () { openDetail(item); });
    return card;
  }

  function renderGuide() {
    var q = state.query.trim().toLowerCase();
    var list = $("item-list");
    list.innerHTML = "";
    var shown = 0;
    WASTE_ITEMS.forEach(function (item) {
      if (state.filter !== "all" && item.cat !== state.filter) return;
      if (q && item.name.toLowerCase().indexOf(q) === -1) return;
      list.appendChild(itemCard(item));
      shown++;
    });
    $("item-count").textContent = shown + " dari " + WASTE_ITEMS.length + " barang";
    $("no-results").style.display = shown === 0 ? "block" : "none";
  }

  function openDetail(item) {
    var c = CATEGORIES[item.cat];
    $("modal-title").textContent = item.name;
    var badge = $("modal-badge");
    badge.textContent = c.label + "  •  " + c.bin;
    badge.style.background = c.color;
    var steps = $("modal-steps");
    steps.innerHTML = "";
    item.steps.forEach(function (s) {
      steps.appendChild(el("li", null, s));
    });
    $("modal-tip").textContent = item.tip;
    $("modal").classList.add("open");
    $("modal").setAttribute("aria-hidden", "false");
  }
  function closeDetail() {
    $("modal").classList.remove("open");
    $("modal").setAttribute("aria-hidden", "true");
  }

  // ---------- KUIS ----------
  var quiz = { items: [], index: 0, score: 0, answered: false };

  function startQuiz() {
    quiz.items = shuffle(WASTE_ITEMS).slice(0, 10);
    quiz.index = 0;
    quiz.score = 0;
    quiz.answered = false;
    $("quiz-start").style.display = "none";
    $("quiz-play").style.display = "block";
    $("quiz-result").style.display = "none";
    showQuestion();
  }

  function showQuestion() {
    var item = quiz.items[quiz.index];
    quiz.answered = false;
    $("quiz-progress").textContent = "Soal " + (quiz.index + 1) + " dari 10  •  Skor: " + quiz.score;
    $("quiz-item").textContent = item.name;
    $("quiz-feedback").textContent = "";
    $("quiz-feedback").className = "quiz-feedback";
    var opts = $("quiz-options");
    opts.innerHTML = "";
    Object.keys(CATEGORIES).forEach(function (key) {
      var c = CATEGORIES[key];
      var b = el("button", "bin-btn");
      b.type = "button";
      b.style.borderColor = c.color;
      b.style.color = c.color;
      b.innerHTML = "<span class='bin-dot' style='background:" + c.color + "'></span>" + c.label + " — " + c.bin;
      b.addEventListener("click", function () { answerQuiz(key, b); });
      opts.appendChild(b);
    });
    $("quiz-next").style.display = "none";
  }

  function answerQuiz(picked, btn) {
    if (quiz.answered) return;
    quiz.answered = true;
    var item = quiz.items[quiz.index];
    var correct = picked === item.cat;
    var buttons = $("quiz-options").querySelectorAll("button");
    buttons.forEach(function (b) { b.disabled = true; });
    if (correct) {
      quiz.score++;
      btn.classList.add("correct");
      $("quiz-feedback").textContent = "Benar! " + item.name + " masuk " + c_bin(item) + ".";
      $("quiz-feedback").className = "quiz-feedback good";
    } else {
      btn.classList.add("wrong");
      buttons.forEach(function (b) {
        if (b.textContent.indexOf(CATEGORIES[item.cat].label) === 0) b.classList.add("correct");
      });
      $("quiz-feedback").textContent = "Belum tepat — " + item.name + " masuk " + c_bin(item) + " (" + CATEGORIES[item.cat].label + ").";
      $("quiz-feedback").className = "quiz-feedback bad";
    }
    $("quiz-progress").textContent = "Soal " + (quiz.index + 1) + " dari 10  •  Skor: " + quiz.score;
    var next = $("quiz-next");
    next.style.display = "inline-block";
    next.textContent = quiz.index === 9 ? "Lihat hasilku" : "Soal berikutnya";
  }
  function c_bin(item) {
    return CATEGORIES[item.cat].bin;
  }

  function nextQuestion() {
    if (quiz.index === 9) { showResult(); return; }
    quiz.index++;
    showQuestion();
  }

  function showResult() {
    $("quiz-play").style.display = "none";
    var r = $("quiz-result");
    r.style.display = "block";
    $("quiz-score").textContent = quiz.score + " / 10";
    var msg;
    if (quiz.score === 10) msg = "Sempurna! Kamu sudah jago memilah — ajari tetanggamu.";
    else if (quiz.score >= 7) msg = "Hebat! Kamu sudah tahu sebagian besar aturannya. Cek panduan untuk yang masih keliru.";
    else if (quiz.score >= 4) msg = "Awal yang bagus. Beberapa barang memang menjebak — panduannya menjelaskan semuanya.";
    else msg = "Memilah butuh latihan. Baca panduannya, lalu coba kuisnya lagi.";
    $("quiz-message").textContent = msg;
  }

  // ---------- KALKULATOR ----------
  // Asumsi (ditampilkan di halaman):
  //  - rata-rata sampah rumah tangga: 0,7 kg per orang per hari
  //  - bagian yang bisa dialihkan saat memilah: 60% (organik + daur ulang)
  //  - CO2 yang dihindari: 1 kg CO2e per kg sampah yang dialihkan (perkiraan campuran yang konservatif)
  var KG_PER_PERSON_DAY = 0.7;
  var DIVERTIBLE_SHARE = 0.60;
  var CO2_PER_KG = 1.0;
  var DAYS_PER_MONTH = 30;

  function calc() {
    var people = parseFloat($("calc-people").value) || 0;
    var days = parseFloat($("calc-days").value) || 0;
    if (people < 1) people = 1;
    if (people > 20) people = 20;
    if (days < 0) days = 0;
    if (days > 7) days = 7;
    var monthlyKg = people * KG_PER_PERSON_DAY * DIVERTIBLE_SHARE * (days / 7) * DAYS_PER_MONTH;
    var monthlyCo2 = monthlyKg * CO2_PER_KG;
    var yearlyKg = monthlyKg * 12;
    $("calc-kg").textContent = monthlyKg.toFixed(1).replace(".", ",") + " kg / bulan";
    $("calc-co2").textContent = monthlyCo2.toFixed(1).replace(".", ",") + " kg CO₂e / bulan";
    $("calc-year").textContent = yearlyKg.toFixed(0) + " kg / tahun";
    $("calc-summary").textContent =
      "Rumah tangga berisi " + people + " orang yang memilah " + days + " hari seminggu " +
      "mengalihkan sekitar " + monthlyKg.toFixed(1).replace(".", ",") +
      " kg sampah dari TPA setiap bulan — kira-kira " +
      monthlyCo2.toFixed(1).replace(".", ",") + " kg CO₂e yang dihindari.";
  }

  // ---------- pasang event ----------
  document.addEventListener("DOMContentLoaded", function () {
    // panduan
    $("search").addEventListener("input", function (e) {
      state.query = e.target.value;
      renderGuide();
    });
    document.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        state.filter = chip.getAttribute("data-filter");
        renderGuide();
      });
    });
    $("modal-close").addEventListener("click", closeDetail);
    $("modal").addEventListener("click", function (e) {
      if (e.target === $("modal")) closeDetail();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDetail();
    });
    renderGuide();

    // kuis
    $("quiz-start-btn").addEventListener("click", startQuiz);
    $("quiz-next").addEventListener("click", nextQuestion);
    $("quiz-retry").addEventListener("click", startQuiz);

    // kalkulator
    $("calc-people").addEventListener("input", calc);
    $("calc-days").addEventListener("input", calc);
    calc();
  });
})();
