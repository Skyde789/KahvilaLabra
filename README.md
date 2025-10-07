# Viikko 2 – CSS: Ulkoasun hallinta (README)

Tee tehtävät muokkaamalla **Viikko 1 -projektiasi** (`index.html`, `table.html`, `form.html`, `image.html`) lisäämällä tyylit `styles.css`-tiedostoon. Tehtävät on linjassa automaattisten testien kanssa.

---

## CSS-yksiköt – selitykset

Rem (root em) ja ch (character) ovat suhteellisia pituusyksiköitä CSS:ssä, mutta ne mittaavat eri asioita ja soveltuvat eri käyttötarkoituksiin.

### Rem (root em)

Rem on pituusyksikkö, joka on suhteessa dokumentin juurielementin (<html>) fonttikokoon. Toisin sanoen, jos juurielementin fonttikoko on asetettu 16 pikseliin, 1rem on 16 pikseliä. Rem on hyödyllinen, koska se skaalaa koko sivun asettelun ja typografian yhdenmukaisesti. Jos muutat juurielementin fonttikokoa, kaikki rem-yksikköä käyttävät elementit skaalautuvat sen mukaisesti, mikä parantaa saavutettavuutta ja helpottaa responsiivisen suunnittelun toteuttamista. Sen vuoksi sitä suositellaan erityisesti fonttikok...

padding ja margin.

### Ch (character)

Ch-yksikkö on puolestaan suhteessa fontin "0" (nolla) -merkin leveyteen. Sen arvo perustuu fontin font-size ja font-family -ominaisuuksien perusteella laskettuun leveyteen. Tätä yksikköä käytetään erityisesti tekstialueiden maksimileveyden määrittämiseen. Tavoitteena on pitää rivinpituus helposti luettavana, ja yleinen suositus on 60–75 merkkiä per rivi. Käyttämällä 

max-width: 60ch -määritystä varmistat, että tekstin rivinpituus pysyy optimaalisena, riippumatta näytön koosta.

### Prosentti (%)

Prosentti on suhteellinen yksikkö, jonka arvo määräytyy yleensä suhteessa vanhemman elementin kokoon. Esimerkiksi leveys: width: 50% asettaa elementin leveydeksi puolet sen sisältävän elementin leveydestä. Prosentteja hyödynnetään erityisesti asettelussa (layout), kun halutaan, että elementit mukautuvat sisältävän säiliön mittoihin. Muista kuitenkin, että vaikutus riippuu aina kontekstista (mihin ominaisuuteen ja mihin vanhempaan elementtiin suhteutetaan).

### VW ja VH (viewport width / height)

VW ja VH ovat yksiköitä, jotka suhteutuvat selainikkunan (viewportin) kokoon. 1vw vastaa yhtä prosenttia näkyvän alueen leveydestä ja 1vh yhtä prosenttia korkeudesta. Näitä yksiköitä käytetään esimerkiksi täyskorkeiden osioiden luomiseen (height: 100vh) tai leveysperusteiseen skaalaamiseen. Huomaa, että mobiililaitteissa osoitepalkin näkyminen/peittyminen voi muuttaa käytettävää viewport-korkeutta, mikä voi vaikuttaa vh-yksikköön perustuvien elementtien käyttäytymiseen.



### Tee tarvittavat HTML-lisäykset
Tehtävä edellyttää muutamia HTML lisäyksiä CSS-tehtäviä varten. Tee tarvittavat muutokset Viikko 1 -sivupohjiin:
- Lisää tarvittaessa `.container`-luokka sopivaan kääreeseen/kappaleeseen, jotta voit toteuttaa rivinpituuden rajoituksen, keskityksen ja paddingin.
- Lisää yksi `.box`-elementti (esim. sisältölohko, jota käytät box model -tehtävässä).
- Lisää kaksi otsikkoa, joista toiseen `class="title"` ja toiseen `class="title strong"` (spesifisyystehtävää varten).


---

## Tehtävät (T1–T8)

### T1 – Ulkoinen CSS, ei inline-tyylejä tai `<style>`
**Testaa/vaikutus:** `styles.css` on linkitetty `<head>`-osiossa; ei `<style>`-elementtejä eikä `[style]`-attribuutteja.

**Tee näin:**
- Lisää `<head>`-osioon linkitys `styles.css`-tiedostoon.
- Poista mahdolliset inline-tyylit (style-attribuutit) ja `<style>`-tagit.

**Vihje:**
```html
<!-- lisää <head>-osioon linkitys ulkoiseen CSS-tiedostoon -->
<!-- poista inline-tyylit: [style]-attribuutit ja <style>-elementit -->
```

### T2 – CSS-muuttujat `:root`-tasolla + `var(--...)` käytössä
**Testaa/vaikutus:** `:root`-lohkossa ≥ 1 `--muuttuja`, ja `var(--muuttuja)` käytetään arvona jossain säännössä.

**Tee näin:**
- Määritä `:root`-tasolle muutamia `--muuttujia` (esim. värit).
- Käytä arvoa `var(--nimi)` jossakin tyylissä.

**Vihje:**
```css
/* :root: määrittele tänne vähintään yksi --muuttuja */
/* käytä var(--nimi) vähintään yhdessä säännössä */
```

### T3 – Typografia: `body` line-height ≥ 1.4
**Testaa/vaikutus:** `body`-elementin line-height on vähintään 1.4.

**Tee näin:**
- Aseta `body`:lle line-height (esim. 1.5–1.6).

**Vihje:**
```css
/* body: line-height vähintään 1.4 */
```

### T4 – `.container`: max-width **ch**-yksiköllä, keskitys ja padding
**Testaa/vaikutus:** `.container { max-width: <numero>ch }` + keskitys (marginit) + padding > 0.

**Tee näin:**
- Rajoita rivinpituus `max-width: ...ch;` (esim. 60–75ch).
- Keskitä sisältö vaakasuunnassa.
- Lisää sopiva `padding`.

**Vihje:**
```css
/* .container: aseta max-width ch-yksiköllä (esim. 60–75ch) */
/* Keskitys onnistuu margin-inline: ... */
/* Muista lisätä padding > 0 */
```

### T5 – Navigaatio: `nav`issa vähintään 2 linkkiä (`a[href]`)
**Testaa/vaikutus:** `nav`-elementissä on vähintään 2 ankkuria.

**Tee näin:**
- Lisää `nav`, jossa vähintään kaksi linkkiä (voi ohjata sivun osioihin).

**Vihje:**
```html
<!-- <nav>-elementti ja vähintään kaksi a[href]-linkkiä -->
```

### T6 – `.box`: `padding` + `border` + `margin` kaikki > 0
**Testaa/vaikutus:** `.box`-elementillä `padding`, `border` ja `margin` ovat kaikki > 0.

**Tee näin:**
- Lisää `.box`-luokalle margin, padding ja border.

**Vihje:**
```css
/* .box: lisää margin */
/* .box: lisää padding */
/* .box: lisää border */
```

### T7 – Spesifisyys: `.title.strong` yliajaa `.title`
**Testaa/vaikutus:** `.title.strong` poikkeaa näkyvästi (esim. väri) `.title`:stä.

**Tee näin:**
- Luo elementti `class="title"` ja toinen `class="title strong"`.
- Anna `.title`:lle jokin väri ja `.title.strong`:lle **eri** väri.

**Vihje:**
```css
/* .title: aseta väri */
/* .title.strong: aseta ERI väri kuin .title – tällöin yliajo näkyy */
```

### T8 – Ei CSS-frameworkeja
**Testaa/vaikutus:** HTML:ssä ei ole viittauksia CSS-frameworkeihin (bootstrap, tailwind, bulma, ym.).

**Tee näin:**
- Älä linkitä ulkoisia frameworkeja.

**Vihje:**
```html
<!-- varmista, ettei HTML:ssä ole linkityksiä CSS-frameworkeihin -->
```

---

## Paikallinen ajo ja testaus

1. Asennukset (ensikerta tai kun Playwright pyytää):
   ```bash
   npm install
   npx @playwright/test install
   ```

2. Aja kaikki testit:
   ```bash
   npm test
   ```

3. (Valinnainen) Yksittäisen testin ajo / debug:
   ```bash
   npx playwright test tests/form.spec.ts
   npx playwright test -g "lomake"
   npx playwright show-report
   ```

---



## Pisteytys

- **T1** (ulkoinen CSS) ja **T8** (ei frameworkeja) ovat **laatukriteereitä (0 p)**, mutta niiden on silti täytyttävä.
- Pisteet muodostuvat tehtävistä **T2–T7** automaattisen testauksen perusteella.
- Autograding kokoaa tulokset raportiksi ja pisteiksi Classroomissa.


## Tarkistuslista ennen palautusta

- [X] `styles.css` on linkitetty oikein `<head>`-osiossa.
- [X] Ei inline-tyylejä eikä `<style>`-tageja.
- [X] `:root` sisältää vähintään yhden `--muuttujan`.
- [X] `var(--...)` käytetty CSS:ssä.
- [X] `body` line-height on vähintään **1.4**.
- [X] `.container` max-width **ch**, keskitys marginaaleilla, `padding` > 0.
- [X] `nav`issa vähintään 2 linkkiä `href`-attribuutilla.
- [X] `.box` sisältää `margin`, `padding`, `border` > 0.
- [X] `.title.strong` yliajaa `.title` (näkyvä ero, esim. väri).
- [X] Ei CSS-frameworkeja käytössä.
