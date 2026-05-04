const WHATSAPP_NUMBER = "393927008720"; // modifica qui il numero WhatsApp se necessario
const EMAIL = "postmaster@abbonamentiauto.it";

const offers = [
  {
    segmento: "CITY CAR",
    brand: "CITROEN",
    modello: "C3 Turbo 100 cv Manuale PLUS",
    alimentazione: "Benzina",
    cambio: "Manuale",
    mesi: 48,
    km: "60.000",
    anticipo: "1.000 €",
    canone: "290 €",
    immagine: "immagini/citroen-c3.svg"
  },
  {
    segmento: "CROSSOVER",
    brand: "CITROEN",
    modello: "C3 Aircross Turbo 100 cv Manuale PLUS",
    alimentazione: "Benzina",
    cambio: "Manuale",
    mesi: 48,
    km: "40.000",
    anticipo: "0 €",
    canone: "310 €",
    immagine: "immagini/citroen-c3-aircross.svg"
  },
  {
    segmento: "SUV",
    brand: "BMW",
    modello: "X3 xDrive 20d",
    alimentazione: "Diesel",
    cambio: "Manuale",
    mesi: 48,
    km: "80.000",
    anticipo: "3.500 €",
    canone: "730 €",
    immagine: "immagini/bmw-x3.svg"
  },
  {
    segmento: "PREMIUM",
    brand: "BMW",
    modello: "X5 xDrive 30d Automatic",
    alimentazione: "Diesel",
    cambio: "Automatica",
    mesi: 48,
    km: "80.000",
    anticipo: "5.000 €",
    canone: "912 €",
    immagine: "immagini/bmw-x5.svg"
  },
  {
    segmento: "SUV",
    brand: "AUDI",
    modello: "Q5 Business Advanced",
    alimentazione: "Diesel",
    cambio: "Automatica",
    mesi: 48,
    km: "60.000",
    anticipo: "4.000 €",
    canone: "589 €",
    immagine: "immagini/audi-q5.svg"
  },
  {
    segmento: "CROSSOVER",
    brand: "NISSAN",
    modello: "Juke Hybrid N-Connecta",
    alimentazione: "Hybrid",
    cambio: "Automatica",
    mesi: 48,
    km: "60.000",
    anticipo: "2.000 €",
    canone: "349 €",
    immagine: "immagini/nissan-juke.svg"
  }
];

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderOffers(filter = "tutte") {
  const grid = document.getElementById("offersGrid");
  const filtered = filter === "tutte" ? offers : offers.filter(o => o.segmento === filter);
  grid.innerHTML = filtered.map((offer) => {
    const msg = `Ciao, vorrei informazioni sull'offerta ${offer.brand} ${offer.modello} a ${offer.canone}/mese pubblicata su Abbonamentiauto.it.`;
    return `
      <article class="offer-card">
        <div class="offer-content">
          <div class="offer-top">
            <div>
              <div class="car-brand">${offer.brand}</div>
              <h3>${offer.modello}</h3>
            </div>
            <span class="segment">${offer.segmento}</span>
          </div>
          <img class="offer-img" src="${offer.immagine}" alt="${offer.brand} ${offer.modello}">
          <div class="spec-row">
            <span>${offer.alimentazione}</span>
            <span>${offer.cambio}</span>
            <span>${offer.mesi} mesi</span>
            <span>${offer.km} km</span>
          </div>
          <div class="bottom-box">
            <div class="price">${offer.canone.replace(' €','€')}<small>/mese</small></div>
            <div class="mini-specs">
              <span>Anticipo ${offer.anticipo}</span>
              <span>${offer.km} km totali</span>
            </div>
            <div class="card-actions">
              <a class="btn primary" href="${whatsappLink(msg)}" target="_blank" rel="noopener">WhatsApp</a>
              <a class="btn ghost" href="mailto:${EMAIL}?subject=Richiesta offerta ${offer.brand} ${offer.modello}&body=${encodeURIComponent(msg)}">Email</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function setupFilters() {
  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderOffers(button.dataset.filter);
    });
  });
}

function setupLeadForm() {
  const form = document.getElementById("leadForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome");
    const telefono = data.get("telefono");
    const interesse = data.get("interesse");
    const message = `Nuova richiesta da Abbonamentiauto.it%0A%0ANome: ${nome}%0ATelefono: ${telefono}%0AInteresse: ${interesse}`;
    window.location.href = `mailto:${EMAIL}?subject=Nuova richiesta Abbonamentiauto.it&body=${message}`;
    form.reset();
  });
}

function setupMenu() {
  const btn = document.getElementById("menuBtn");
  const nav = document.querySelector(".nav-links");
  btn.addEventListener("click", () => nav.classList.toggle("open"));
}

function setupWhatsapp() {
  const msg = "Ciao, vorrei informazioni sulle offerte di Abbonamentiauto.it.";
  document.getElementById("whatsappHero").href = whatsappLink(msg);
  document.getElementById("whatsappHero").target = "_blank";
  document.getElementById("floatingWhatsapp").href = whatsappLink(msg);
  document.getElementById("floatingWhatsapp").target = "_blank";
}

renderOffers();
setupFilters();
setupLeadForm();
setupMenu();
setupWhatsapp();
