import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeModule } from './theme.module';

@Injectable({
  providedIn: ThemeModule,
})
export class ThemeService {
  private readonly darkThemeClass: string;
  private readonly localStorageKey: string;
  private readonly isDarkSubject$: BehaviorSubject<boolean>;

  public constructor(@Inject(DOCUMENT) private document: Document) {
    this.darkThemeClass = 'dark-theme';
    this.localStorageKey = 'survey-manager-theme';
    this.isDarkSubject$ = new BehaviorSubject<boolean>(this.isDark);
  }

  public get isDark$(): Observable<boolean> {
    return this.isDarkSubject$.asObservable();
  }

  public get isDark(): boolean {
    return this.document.documentElement.classList.contains(
      this.darkThemeClass,
    );
  }

  public preserveState(): void {
    localStorage.setItem(this.localStorageKey, String(this.isDark));
  }

  public synchronizeState(): void {
    const value: string | null = localStorage.getItem(this.localStorageKey);
    if (value === 'true') {
      this.setDark();
    } else if (value === 'false') {
      this.setLight();
    }
  }

  public toggle(): void {
    if (this.isDark) {
      this.setLight();
    } else {
      this.setDark();
    }
  }

  public setDark(): void {
    this.document.documentElement.classList.add(this.darkThemeClass);
    this.isDarkSubject$.next(true);
  }

  public setLight(): void {
    this.document.documentElement.classList.remove(this.darkThemeClass);
    this.isDarkSubject$.next(false);
  }
}
