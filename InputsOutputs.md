# Inputs/Outputs: używanie Signals do komunikacji między komponentami (Angular)

Ten dokument pokazuje, jak wykorzystywać **Angular Signals** do komunikacji:
- **rodzic → dziecko** (wejścia / `input()`),
- **dziecko → rodzic** (zdarzenia / `output()`),
- **rodzeństwo** i/lub komponenty w różnych gałęziach drzewa (wspólny **store/service** oparty o signals).

> Przykłady zakładają Angular w wersji wspierającej `signal`, `computed`, `effect` oraz `input()`/`output()` (Angular 16+; API `input()`/`output()` jest w nowszych wersjach).

---

## 1) Rodzic → dziecko: `input()` jako Signal

Klasyczny `@Input()` działa, ale wygodniej jest użyć `input()` (dziecko dostaje **Signal** i czyta go jak funkcję).

### Dziecko: `user-card.component.ts`

```ts
import { Component, input, computed } from '@angular/core';

type User = { id: number; name: string; role?: string };

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <section class="card">
      <h3>{{ displayName() }}</h3>
      <small>id: {{ userId() }}</small>
    </section>
  `,
})
export class UserCardComponent {
  // input() tworzy signal wejściowy
  user = input.required<User>();

  userId = computed(() => this.user().id);
  displayName = computed(() => `${this.user().name} (${this.user().role ?? 'user'})`);
}
```

### Rodzic: `users-page.component.ts`

```ts
import { Component, signal } from '@angular/core';
import { UserCardComponent } from './user-card.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UserCardComponent],
  template: `
    <button (click)="setAdmin()">Ustaw rolę admin</button>

    <app-user-card [user]="selectedUser()" />
  `,
})
export class UsersPageComponent {
  selectedUser = signal({ id: 1, name: 'Ala', role: 'user' });

  setAdmin() {
    this.selectedUser.update(u => ({ ...u, role: 'admin' }));
  }
}
```

**Co tu jest ważne:**
- rodzic może przekazać do `[user]` wartość z `signal()` przez `selectedUser()`,
- dziecko dostaje `user` jako signal i reaguje automatycznie na zmiany.

---

## 2) Dziecko → rodzic: `output()` (sygnałowe zdarzenia)

Zamiast `@Output() new EventEmitter<...>()` możesz użyć `output<T>()`.
Rodzic nasłuchuje normalnie: `(save)="..."`.

### Dziecko: `counter.component.ts`

```ts
import { Component, signal, output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="dec()">-</button>
    <strong>{{ value() }}</strong>
    <button (click)="inc()">+</button>

    <button (click)="commit()">Zapisz</button>
  `,
})
export class CounterComponent {
  value = signal(0);

  // output() tworzy "emiter" zdarzeń (bez EventEmitter)
  committed = output<number>();

  inc() { this.value.update(v => v + 1); }
  dec() { this.value.update(v => v - 1); }

  commit() {
    this.committed.emit(this.value());
  }
}
```

### Rodzic: `counter-page.component.ts`

```ts
import { Component, signal } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [CounterComponent],
  template: `
    <app-counter (committed)="onCommitted($event)" />

    <p>Ostatnio zapisano: {{ lastCommitted() }}</p>
  `,
})
export class CounterPageComponent {
  lastCommitted = signal<number | null>(null);

  onCommitted(value: number) {
    this.lastCommitted.set(value);
  }
}
```

---

## 3) Dziecko → rodzic: alternatywa z callbackiem jako `input()`

Czasem zamiast eventów wygodniej przekazać do dziecka funkcję (callback).
To jest też komunikacja “w górę”, ale bez `(event)`.

### Dziecko: `rename.component.ts`

```ts
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-rename',
  standalone: true,
  template: `
    <input [value]="name()" (input)="name.set(($any($event.target).value))" />
    <button (click)="apply()">OK</button>
  `,
})
export class RenameComponent {
  initial = input.required<string>();
  onRename = input.required<(newName: string) => void>();

  name = signal('');

  ngOnInit() {
    this.name.set(this.initial());
  }

  apply() {
    this.onRename()(this.name());
  }
}
```

### Rodzic: `profile.component.ts`

```ts
import { Component, signal } from '@angular/core';
import { RenameComponent } from './rename.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RenameComponent],
  template: `
    <p>Nazwa: {{ username() }}</p>

    <app-rename
      [initial]="username()"
      [onRename]="rename"
    />
  `,
})
export class ProfileComponent {
  username = signal('Jan');

  // ważne: arrow function, żeby zachować "this"
  rename = (newName: string) => {
    this.username.set(newName);
  };
}
```

---

## 4) Rodzeństwo / różne gałęzie drzewa: wspólny store/service oparty o Signals

Dla komunikacji między komponentami, które nie są w relacji rodzic-dziecko,
najczyściej jest użyć serwisu jako **mini-store** opartego o signals.

### Store: `selection.store.ts`

```ts
import { Injectable, signal, computed } from '@angular/core';

type Item = { id: number; label: string };

@Injectable({ providedIn: 'root' })
export class SelectionStore {
  private readonly _selected = signal<Item | null>(null);

  selected = this._selected.asReadonly();
  hasSelection = computed(() => this.selected() !== null);

  select(item: Item) {
    this._selected.set(item);
  }

  clear() {
    this._selected.set(null);
  }
}
```

### Komponent A (np. lista): `items-list.component.ts`

```ts
import { Component } from '@angular/core';
import { SelectionStore } from './selection.store';

@Component({
  selector: 'app-items-list',
  standalone: true,
  template: `
    <ul>
      <li><button (click)="select(1)">Wybierz 1</button></li>
      <li><button (click)="select(2)">Wybierz 2</button></li>
    </ul>
  `,
})
export class ItemsListComponent {
  constructor(private readonly store: SelectionStore) {}

  select(id: number) {
    this.store.select({ id, label: `Item ${id}` });
  }
}
```

### Komponent B (np. panel szczegółów): `selected-details.component.ts`

```ts
import { Component, computed } from '@angular/core';
import { SelectionStore } from './selection.store';

@Component({
  selector: 'app-selected-details',
  standalone: true,
  template: `
    <section *ngIf="selected(); else empty">
      <h4>Szczegóły</h4>
      <div>Id: {{ selected()!.id }}</div>
      <div>Label: {{ selected()!.label }}</div>
      <button (click)="clear()">Wyczyść</button>
    </section>

    <ng-template #empty>
      <p>Brak zaznaczenia</p>
    </ng-template>
  `,
})
export class SelectedDetailsComponent {
  selected = this.store.selected;

  // opcjonalnie: pochodne wartości
  title = computed(() => this.selected()?.label ?? 'Brak');

  constructor(private readonly store: SelectionStore) {}

  clear() {
    this.store.clear();
  }
}
```

**Zalety podejścia “store + signals”:**
- działa niezależnie od zagnieżdżenia komponentów,
- minimalizuje “przepychanie” danych przez wiele poziomów inputów/outputów,
- jest łatwe w testowaniu (logika w serwisie).

---

## 5) `effect()` – reagowanie na zmiany wejść (kiedy naprawdę potrzebne)

Często wystarczy `computed()`. `effect()` używaj, gdy musisz wykonać **skutek uboczny**:
np. log, zapis do localStorage, wywołanie metody, integracja z API (z ostrożnością).

```ts
import { Component, input, effect } from '@angular/core';

@Component({
  selector: 'app-debug-user',
  standalone: true,
  template: `<pre>{{ user() | json }}</pre>`,
})
export class DebugUserComponent {
  user = input.required<{ id: number; name: string }>();

  constructor() {
    effect(() => {
      console.log('User changed:', this.user());
    });
  }
}
```

---

## 6) Kiedy używać czego (ściąga)

- **Rodzic → dziecko**: `input()` (dziecko widzi signal).
- **Dziecko → rodzic**: `output()` (zdarzenia), ewentualnie callback jako `input()`.
- **Rodzeństwo / różne miejsca w aplikacji**: serwis/store z `signal()` + `computed()`.
- **Pochodne dane**: `computed()`.
- **Skutki uboczne**: `effect()` (tylko gdy potrzebujesz).

---

Jeśli chcesz, dopasuję przykłady do Twojego konkretnego przypadku (np. formularze, tabela, wizard, modal). Napisz tylko:
1) wersję Angulara,
2) scenariusz komunikacji (kto z kim i jakie dane),
3) czy używasz standalone components i czy masz już serwisy/store.