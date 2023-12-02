import { Component } from '@angular/core'
import {faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import {Theme, ThemeProvider} from '../theme-provider'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isMenuCollapsed = true

  public get showMoonInThemeSwitcher(): boolean {
    return !this.isDarkTheme
  }

  public set showMoonInThemeSwitcher(showMoon: boolean) {
    this.isDarkTheme = !showMoon
  }

  public get navbarClasses(): string {
    return this.isDarkTheme ? 'navbar-dark' : 'navbar-light'
  }

  protected readonly faSun = faSun
  protected readonly faMoon = faMoon

  private get isDarkTheme(): boolean {
    return this.themeProvider.isDarkTheme
  }

  private set isDarkTheme(shouldBeDarkTheme: boolean) {
    this.themeProvider.theme = shouldBeDarkTheme ? Theme.dark : Theme.light
  }

  public constructor(
    private readonly themeProvider: ThemeProvider,
  ) {}

  public toggleMenuCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed
  }

  public onTabButtonClick() {
    this.isMenuCollapsed = true
  }
}
