// BOK Coffee & Eatery - script

// jam buka: 0 = Minggu ... 6 = Sabtu  [buka, tutup] dalam jam
const jamBuka = {
  0: [15, 22],
  1: [10, 22], 2: [10, 22], 3: [10, 22],
  4: [10, 22], 5: [10, 22], 6: [10, 22]
};

document.addEventListener("DOMContentLoaded", function () {
  // tahun di footer
  document.querySelectorAll(".tahun").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // status buka / tutup
  const status = document.getElementById("status-buka");
  if (status) {
    const now = new Date();
    const jam = now.getHours() + now.getMinutes() / 60;
    const [buka, tutup] = jamBuka[now.getDay()];
    const isOpen = jam >= buka && jam < tutup;
    status.innerHTML =
      '<span class="status-dot ' + (isOpen ? "open" : "closed") + '"></span>' +
      (isOpen ? "Sedang buka, tutup jam " + tutup + ".00" : "Sedang tutup, buka lagi jam " + nextOpen(now) + ".00");
  }

  // tandai hari ini di tabel jam
  const row = document.querySelector('.hours tr[data-day="' + new Date().getDay() + '"]');
  if (row) row.classList.add("today");

  // filter menu
  const tombol = document.querySelectorAll(".filter-btn");
  tombol.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tombol.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      const kat = btn.dataset.filter;
      document.querySelectorAll(".menu-card").forEach(function (g) {
        g.style.display = (kat === "semua" || g.dataset.kategori === kat) ? "" : "none";
      });
    });
  });

  // galeri: klik foto -> modal
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  document.querySelectorAll(".gallery img").forEach(function (img) {
    img.addEventListener("click", function () {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalCaption.textContent = img.alt;
      bootstrap.Modal.getOrCreateInstance(document.getElementById("galeriModal")).show();
    });
  });

  // form reservasi / kontak
  const form = document.getElementById("form-kontak");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      const nama = form.nama.value.trim();
      const alertBox = document.getElementById("form-alert");
      alertBox.innerHTML =
        '<div class="alert alert-success mt-3 mb-0">Terima kasih, ' + escapeHtml(nama) +
        '. Pesan kamu sudah kami terima, kami akan membalas secepatnya.</div>';
      form.reset();
      form.classList.remove("was-validated");
    });
  }
});

function nextOpen(now) {
  const jam = now.getHours();
  const hariIni = jamBuka[now.getDay()];
  if (jam < hariIni[0]) return hariIni[0];
  return jamBuka[(now.getDay() + 1) % 7][0];
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
