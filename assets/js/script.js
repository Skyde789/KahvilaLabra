console.log("Script loaded!");

const productName = "...";
const productPrice = "0";

function TeeYhteenveto(a,b){
    return a + " - " + b;
}

console.log(TeeYhteenveto(productName, productPrice));

const title = document.querySelector('main h1');
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

function jea(){
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
