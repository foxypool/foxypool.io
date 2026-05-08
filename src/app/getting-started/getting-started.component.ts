import {Component} from '@angular/core'
import {faArrowRight, faCheck} from '@fortawesome/free-solid-svg-icons'
import {Theme, ThemeProvider} from '../theme-provider'
import {map, Observable} from 'rxjs'

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss'
})
export class GettingStartedComponent {
  protected readonly faCheck = faCheck
  protected readonly faArrowRight = faArrowRight
  protected readonly titleImageUrl$: Observable<string>

  public constructor(private readonly themeProvider: ThemeProvider) {
    this.titleImageUrl$ = this.themeProvider.theme$.pipe(
      map(theme => theme === Theme.dark ? 'https://static.foxypool.io/assets/cover/statuspage.png' : 'https://static.foxypool.io/assets/cover/foxypool.io-white-bg.png'),
    )
  }
}
