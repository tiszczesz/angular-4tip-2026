# Signals w Angular 20+ (2026) — omówienie i przykłady

> **Cel:** krótko i praktycznie wyjaśnić, czym są **Signals** w Angular (20+), jak działają, kiedy ich używać oraz jak łączyć je z RxJS i API Angulara.

---

## 1. Czym są Signals?

**Signal** to prymityw reaktywności w Angularze służący do przechowywania wartości, która:
- może się zmieniać w czasie,
- automatycznie informuje zależne obliczenia i widoki o zmianie,
- jest **synchronizowana** (zmiana jest natychmiast dostępna),
- jest świetnie integrowana z detekcją zmian Angulara.

W praktyce Signals są alternatywą/uzupełnieniem dla:
- lokalnego stanu w komponencie trzymanego w polach klasy,
- części zastosowań RxJS (szczególnie tam, gdzie chcesz prostego stanu synchronicznego).

---

## 2. Podstawy: `signal()`

### 2.1 Tworzenie i odczyt wartości

```ts
import { signal } from '@angular/core';

const count = signal(0);

console.log(count()); // odczyt: 0
```

> **Uwaga:** signal odczytuje się jak funkcję: `count()`.

### 2.2 Aktualizacja wartości: `set()` i `update()`

```ts
count.set(10);               // ustawia na stałą wartość
count.update(v => v + 1);    // aktualizacja na bazie poprzedniej wartości
```

### 2.3 Prosty przykład w komponencie

```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h2>Counter</h2>
    <p>Wartość: {{ count() }}</p>

    <button (click)="inc()">+1</button>
    <button (click)="dec()">-1</button>
    <button (click)="reset()">Reset</button>
  `,
})
export class CounterComponent {
  readonly count = signal(0);

  inc() { this.count.update(v => v + 1); }
  dec() { this.count.update(v => v - 1); }
  reset() { this.count.set(0); }
}
```

---

## 3. `computed()` — wartości pochodne

**Computed signal** to wartość wyliczana na podstawie innych sygnałów. Jest:
- leniwa (zwykle przelicza się, gdy ktoś ją odczyta),
- cache’owana,
- automatycznie śledzi zależności.

```ts
import { signal, computed } from '@angular/core';

const price = signal(100);
const vat = signal(0.23);

const gross = computed(() => price() * (1 + vat()));

console.log(gross()); // 123
price.set(200);
console.log(gross()); // 246
```

Przykład w UI:

```ts
@Component({
  selector: 'app-cart',
  template: `
    <p>Cena netto: {{ net() }}</p>
    <p>VAT: {{ vat() * 100 }}%</p>
    <p>Brutto: {{ gross() }}</p>
  `,
})
export class CartComponent {
  readonly net = signal(100);
  readonly vat = signal(0.23);
  readonly gross = computed(() => this.net() * (1 + this.vat()));
}
```

---

## 4. `effect()` — reakcje na zmiany

**Effect** uruchamia kod uboczny, gdy zmienią się zależności (odczytane w środku sygnały/computed).

Typowe zastosowania:
- logowanie,
- synchronizacja z `localStorage`,
- wywołania usług (ostrożnie — patrz sekcja o RxJS),
- integracje z API przeglądarki.

```ts
import { signal, effect } from '@angular/core';

const theme = signal<'light' | 'dark'>('light');

effect(() => {
  document.documentElement.dataset['theme'] = theme();
});
```

Przykład w komponencie:

```ts
@Component({...})
export class ThemeComponent {
  readonly theme = signal<'light' | 'dark'>('light');

  constructor() {
    effect(() => {
      localStorage.setItem('theme', this.theme());
    });
  }

  toggle() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
```

> **Wskazówka:** staraj się, by `effect()` był „czysty” (bez złożonej logiki), a cięższe rzeczy deleguj do serwisów.

---

## 5. Signals a template — jak Angular „wie”, co odświeżyć?

W Angular 20+ odczyty sygnałów w template (`{{ count() }}`, `*ngIf="flag()"`, itp.) są śledzone. Gdy signal się zmieni, Angular:
- wie, które fragmenty UI zależą od tej wartości,
- i aktualizuje je bez konieczności ręcznego `ChangeDetectorRef`.

To jest jedna z przyczyn, dla których signals świetnie współpracują z architekturą **standalone** i „nowoczesnym” Angular.

---

## 6. Stan obiektowy i tablice — dobre praktyki niemutowalności

Signals nie „magicznie” wykrywają mutacji wewnątrz obiektu. Najbezpieczniej:
- **nie mutować** obiektów/tablic w miejscu,
- zamiast tego tworzyć nowe referencje w `update()`.

### 6.1 Obiekt

```ts
type User = { id: number; name: string; };

const user = signal<User>({ id: 1, name: 'Ala' });

// Źle (mutacja w miejscu — może prowadzić do trudnych bugów):
// user().name = 'Ola';

// Dobrze:
user.update(u => ({ ...u, name: 'Ola' }));
```

### 6.2 Tablica

```ts
const items = signal<string[]>(['a', 'b']);

items.update(arr => [...arr, 'c']);          // dodaj
items.update(arr => arr.filter(x => x !== 'b')); // usuń
items.update(arr => arr.map(x => x.toUpperCase())); // zmień
```

---

## 7. Signals i `@Input()` — `input()` (nowoczesny wariant)

W nowszych Angularach możesz spotkać sygnałowe inputy (tzw. **signal inputs**). Ideą jest, by input był sygnałem, który łatwo łączy się z `computed()`.

Przykładowy wzorzec:

```ts
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `
    <p>{{ message() }}</p>
  `,
})
export class GreetingComponent {
  readonly name = input<string>('Świecie');

  readonly message = computed(() => `Cześć, ${this.name()}!`);
}
```

---

## 8. Signals i RxJS — jak to łączyć w praktyce?

Angular nadal używa RxJS w wielu miejscach (HTTP, router, eventy, streamy). Signals nie „zastępują” RxJS 1:1, tylko upraszczają **stan** i zależności w UI.

Typowe podejście:
- RxJS dla **asynchronicznych strumieni** (np. wyszukiwanie, websockets),
- Signals dla **stanu i obliczeń** w komponencie/feature.

### 8.1 Od Observable do Signal: `toSignal()`

```ts
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

const tick$ = interval(1000).pipe(map(i => i + 1));
const tick = toSignal(tick$, { initialValue: 0 });

console.log(tick()); // 0, potem 1,2,3...
```

### 8.2 Od Signal do Observable: `toObservable()`

```ts
import { toObservable } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';

const q = signal('angular');
const q$ = toObservable(q);

q.set('signals'); // emituje do q$
```

> **Reguła kciuka:** jeśli coś jest „stanem ekranu”, sygnał zwykle jest wygodniejszy. Jeśli to „strumień zdarzeń w czasie”, RxJS często będzie lepszy.

---

## 9. Mini-przykład: filtr + lista (Signals-only)

```ts
import { Component, computed, signal } from '@angular/core';

type Product = { id: number; name: string; price: number; };

@Component({
  selector: 'app-products',
  template: `
    <h2>Produkty</h2>

    <input
      type="text"
      [value]="query()"
      (input)="setQuery($any($event.target).value)"
      placeholder="Szukaj..."
    />

    <p>Znaleziono: {{ filtered().length }}</p>

    <ul>
      <li *ngFor="let p of filtered()">
        {{ p.name }} — {{ p.price }} PLN
      </li>
    </ul>
  `,
})
export class ProductsComponent {
  readonly query = signal('');

  readonly products = signal<Product[]>([
    { id: 1, name: 'Angular Signals Book', price: 99 },
    { id: 2, name: 'RxJS Patterns', price: 120 },
    { id: 3, name: 'TypeScript Tips', price: 79 },
  ]);

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.products();
    return this.products().filter(p => p.name.toLowerCase().includes(q));
  });

  setQuery(v: string) {
    this.query.set(v);
  }
}
```

---

## 10. Kiedy używać Signals (a kiedy nie)?

### Signals są świetne, gdy:
- potrzebujesz **lokalnego stanu komponentu** (liczniki, filtry, UI state),
- chcesz prostych zależności `computed()` (np. „brutto” z „netto”),
- chcesz uniknąć ręcznego `subscribe`/`unsubscribe` dla prostych przypadków,
- budujesz feature state w serwisach (zwłaszcza w aplikacjach z wieloma komponentami).

### Lepiej rozważyć RxJS, gdy:
- masz złożone strumienie (debounce, retry, combineLatest wielu źródeł),
- logika jest mocno „czasowa” (event stream),
- potrzebujesz zaawansowanej kontroli współbieżności (switchMap/concatMap).

---

## 11. Checklist dobrych praktyk

- Trzymaj `signal` jako `readonly` pole i modyfikuj przez metody (czytelność API komponentu/serwisu).
- Używaj `computed()` do wartości pochodnych zamiast ręcznie aktualizować wiele pól.
- Unikaj mutacji obiektów/tablic „w miejscu” — preferuj niemutowalne `update()`.
- `effect()` używaj tylko do **side effects** (a nie do obliczeń).
- Gdy pobierasz dane z API:
  - często: RxJS → `toSignal()`,
  - a wynik w UI: sygnał + `computed()`.

---

## 12. Słowniczek

- **signal** — podstawowa, zapisywalna wartość reaktywna.
- **computed** — wartość pochodna liczona z innych sygnałów.
- **effect** — reakcja z efektami ubocznymi na zmiany zależności.
- **dependency tracking** — automatyczne śledzenie, od czego zależy computed/effect/template.

---