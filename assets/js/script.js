console.log("Script loaded!");

const MENU = [
  { nimi: 'Kahvi', hinta: 5, kategoria: 'Kahvi' },
  { nimi: 'Latte Macchiato', hinta: 8, kategoria: 'Kahvi' },
  { nimi: 'Tee', hinta: 2.5, kategoria: 'Juoma' },
  { nimi: 'Kaakao', hinta: 7, kategoria: 'Makea' },
  { nimi: 'Suklaahippu keksit (5 kpl)', hinta: 7, kategoria: 'Makea' },
  { nimi: 'Laskiaispulla', hinta: 4, kategoria: 'Makea' }
];

const productName = "...";
const productPrice = "0";

function TeeYhteenveto(a, b) {
  return a + " - " + b;
}

console.log(TeeYhteenveto(productName, productPrice));

const title = document.querySelector('header h1');
if (title) {
  const date = new Date().toLocaleDateString('fi-FI');
  title.textContent = `${title.textContent} – ${date}`;
}

document.querySelectorAll('.card').forEach((card, i) => {
  const ots = card.querySelector('.card-title');
  if (ots) {
    ots.textContent = `${i + 1}. ${ots.textContent}`;
  }
});

const card = document.querySelector('.card');
if (card) {
  const name = card.querySelector('.card-title')?.textContent || '';
  const price = card.querySelector('.price')?.textContent || '';

  const p = document.createElement('p');
  p.textContent = TeeYhteenveto(name, price);
  document.querySelector('main')?.appendChild(p);
}

function jea() {
  card?.classList.toggle('hidden');
}

const naytaPiilotaBtn = document.getElementById('naytaPiilotaBtn');

naytaPiilotaBtn?.addEventListener('click', () => {
  jea();
});

const korostaBtn = document.getElementById('korostaBtn');
korostaBtn?.addEventListener('click', () => {
  if (card) {
    card.classList.toggle('highlight');
  }
});


const form = document.querySelector('form.center'); 
if (form) {
  const msg = document.createElement('p');
  form.prepend(msg);

  form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const virheet = [];

    const nimi = form.querySelector('input[name="name"]')?.value.trim();
    if (!nimi) virheet.push('Nimi puuttuu');

    const email = form.querySelector('input[name="email"]')?.value.trim();
    if (!email) {
      virheet.push('Sähköposti puuttuu');
    } else if (!email.includes('@')) {
      virheet.push('Sähköposti ei kelpaa');
    }

    const tuotteet = form.querySelectorAll('input[name="product[]"]:checked');
    if (tuotteet.length === 0) virheet.push('Valitse vähintään yksi tuote');

    if (virheet.length) {
      msg.textContent = 'Tarkista lomake: ' + virheet.join(', ');
      msg.className = 'alert';
    } else {
      msg.textContent = 'Kiitos tilauksestasi!';
      msg.className = 'success';
      form.reset();
    }
  });
}

let ostoskori = [];

function renderMenu(data) {

  let listElement = document.getElementById("menuList");
  if (!listElement) {
    listElement = document.createElement("ul");
    listElement.id = "menuList";
    document.querySelector("main").appendChild(listElement);
  }


  const html = data
    .map((item, i) => `
    <li>
      ${item.nimi} — ${item.hinta.toFixed(2)} € (${item.kategoria})
      <button class="addBtn" data-index="${i}">Lisää koriin</button>
    </li>
  `)
    .join("");

  listElement.innerHTML = html;
  
  document.querySelectorAll(".addBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      const tuote = data[index];
      addToCart(tuote);
    });
  });
  console.log(`renderMenu(): ${data.length} tuotetta`);
}

function setupSearch() {
  const input = document.getElementById("search");
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    const filtered = MENU.filter(item =>
      item.nimi.toLowerCase().includes(query)
    );

    if (query === '') {
      renderMenu(MENU);
    } else {
      renderMenu(filtered, query);
    }
  });
}

function setupAddProduct() {
  const input = document.getElementById("csvInput");
  const button = document.getElementById("addBtn");
  const msg = document.getElementById("msg");

  if (!input || !button) return;

  button.addEventListener("click", () => {
    const raw = input.value.trim();
    msg.textContent = '';

    if (raw === '') {
      msg.textContent = 'Syötä tiedot muodossa: nimi;hinta;kategoria';
      msg.style.color = 'red';
      return;
    }

    const parts = raw.split(';').map(p => p.trim());
    if (parts.length !== 3) {
      msg.textContent = 'Virhe: Syötä tiedot muodossa nimi;hinta;kategoria';
      msg.style.color = 'red';
      return;
    }

    const [nimi, hintaStr, kategoria] = parts;

    const hinta = parseFloat(hintaStr.replace(',', '.'));

    if (nimi.length < 2) {
      msg.textContent = 'Virhe: Nimen oltava vähintään 2 merkkiä.';
      msg.style.color = 'red';
      return;
    }
    if (isNaN(hinta) || hinta <= 0) {
      msg.textContent = 'Virhe: Hinnan oltava positiivinen numero.';
      msg.style.color = 'red';
      return;
    }
    if (kategoria === '') {
      msg.textContent = 'Virhe: Kategoria ei saa olla tyhjä.';
      msg.style.color = 'red';
      return;
    }

    MENU.push({ nimi, hinta, kategoria });

    input.value = '';
    msg.textContent = `Tuote "${nimi}" lisätty onnistuneesti!`;
    msg.style.color = 'green';

    renderMenu(MENU);
  });
}

function addToCart(tuote) {
  const existing = ostoskori.find(item => item.nimi === tuote.nimi);
  if (existing) {
    existing.kpl++;
  } else {
    ostoskori.push({ nimi: tuote.nimi, hinta: tuote.hinta, kpl: 1 });
  }
  renderCart();
}


function renderCart() {
  const body = document.getElementById("cartBody");
  const totalElem = document.getElementById("total");

  if (!body) return;

  body.innerHTML = ostoskori.map(item => {
    const rivihinta = (item.hinta * item.kpl).toFixed(2);
    return `
      <tr>
        <td>${item.nimi}</td>
        <td>${item.kpl}</td>
        <td>${rivihinta} €</td>
      </tr>
    `;
  }).join('');

  const summa = ostoskori.reduce((acc, item) => acc + item.hinta * item.kpl, 0);
  totalElem.textContent = `Loppusumma: ${summa.toFixed(2)} €`;
}

function setupSort() {
  const select = document.getElementById("sortSelect");
  if (!select) return;

  select.addEventListener("change", () => {
    const sortBy = select.value;
    let data = [...MENU]; // tehdään kopio


    const query = document.getElementById("search")?.value.trim().toLowerCase() || "";
    if (query !== "") {
      data = data.filter(item =>
        item.nimi.toLowerCase().includes(query)
      );
    }

    if (sortBy === "nimi") {
      data.sort((a, b) => a.nimi.localeCompare(b.nimi, 'fi'));
    } else if (sortBy === "hinta") {
      data.sort((a, b) => a.hinta - b.hinta);
    }

    renderMenu(data);
  });
}

function setupReport() {
  const btn = document.getElementById("reportBtn");
  const output = document.getElementById("reportOutput");
  if (!btn || !output) return;

  btn.addEventListener("click", () => {
    // Muodostetaan CSV-tyylinen raportti
    const raportti = MENU
      .map(item => `${item.nimi};${item.hinta.toFixed(2)};${item.kategoria}`)
      .join("\n");

    // Tulostetaan konsoliin
    console.log("=== MENU RAPORTTI ===\n" + raportti);

    // Näytetään sivulla
    output.textContent = raportti;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(MENU);
  setupSearch();
  setupAddProduct();
  setupSort();
  renderCart();
  setupReport();
});
