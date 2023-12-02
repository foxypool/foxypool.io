import {Injectable, OnDestroy} from '@angular/core'
import {BehaviorSubject, Observable, Subscription} from 'rxjs'
import {distinctUntilChanged, skip} from 'rxjs/operators'
import {LocalStorageService} from './local-storage.service'

export enum Theme {
  light = 'light',
  dark = 'dark',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeProvider implements OnDestroy {
  public readonly theme$: Observable<Theme>

  public get isDarkTheme(): boolean {
    return this.theme === Theme.dark
  }

  public get theme(): Theme {
    return this.themeSubject.getValue()
  }

  public set theme(theme: Theme) {
    this.themeSubject.next(theme)
  }

  private get persistedTheme(): Theme|undefined {
    const persistedThemeRaw = this.localStorageService.getItem('selected-theme') ?? undefined

    return Theme[persistedThemeRaw]
  }

  private readonly themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.persistedTheme ?? getPreferredTheme())
  private readonly subscriptions: Subscription[] = []

  public constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    this.theme$ = this.themeSubject.pipe(distinctUntilChanged())
    this.subscriptions.push(
      this.theme$.subscribe(theme => {
        if (theme === Theme.dark) {
          document.body.classList.add('dark-theme')
          document.body.setAttribute('data-bs-theme', 'dark')
        } else {
          document.body.classList.remove('dark-theme')
          document.body.setAttribute('data-bs-theme', 'light')
        }
      }),
      this.theme$.pipe(skip(1)).subscribe(theme => {
        this.localStorageService.setItem('selected-theme', theme)
      }),
    )
  }

  public ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }
}

function getPreferredTheme(): Theme {
  const devicePrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')
  if (devicePrefersDarkTheme.matches) {
    return Theme.dark
  }

  const devicePrefersLightTheme = window.matchMedia('(prefers-color-scheme: light)')
  if (devicePrefersLightTheme.matches) {
    return Theme.light
  }

  return Theme.dark
}
