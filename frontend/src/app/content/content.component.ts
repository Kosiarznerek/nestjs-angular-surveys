import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  public readonly isDarkTheme$: Observable<boolean>;
  public readonly toolbarHeaderText$: Observable<string>;

  public constructor(
    private readonly router: Router,
    private readonly themeService: ThemeService,
  ) {
    this.isDarkTheme$ = this.themeService.isDark$;
    this.toolbarHeaderText$ = this.router.events.pipe(
      startWith(new NavigationEnd(NaN, '', '')),
      filter((routeEvent) => routeEvent instanceof NavigationEnd),
      map(() => this.router.url),
      map(this.getToolbalHeaderText),
    );
  }

  public navigateLanding(): Promise<boolean> {
    return this.router.navigate(['/']);
  }

  public toggleTheme(): void {
    this.themeService.toggle();
    this.themeService.preserveState();
  }

  private getToolbalHeaderText(routerUrl: string): string {
    const childRoutePath: string | undefined = routerUrl
      .split('/surveys')
      .pop();

    if (typeof childRoutePath !== 'string') {
      return 'Survey application';
    } else if (childRoutePath.startsWith('/generate')) {
      return 'Create new survey';
    } else if (childRoutePath.startsWith('/archive')) {
      return 'Browse your filled surveys';
    } else if (childRoutePath.startsWith('/complete')) {
      return 'Complete survey';
    } else if (childRoutePath.startsWith('/results')) {
      return 'Check your survey results';
    }

    return 'Survey application';
  }
}
