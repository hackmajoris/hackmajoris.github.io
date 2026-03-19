import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'cv-theme';

  private _theme = signal<Theme>(this.getInitialTheme());
  readonly theme = this._theme.asReadonly();

  // Track whether the toggle has been clicked
  private _toggled = signal<number>(0);
  readonly toggled = this._toggled.asReadonly();

  constructor() {
    effect(() => {
      const t = this._theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(this.storageKey, t);
    });
  }

  toggle(): void {
    this._theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
    this._toggled.update((count) => count + 1);
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
    return 'dark'; // Default to dark theme
  }
}
