import {Component} from '@angular/core'
import {faArrowRight, faCheck} from '@fortawesome/free-solid-svg-icons'
import {FaIconComponent} from '@fortawesome/angular-fontawesome'
import {Theme, ThemeProvider} from '../theme-provider'
import {map, Observable} from 'rxjs'
import {AsyncPipe} from '@angular/common'

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [
    FaIconComponent,
    AsyncPipe
  ],
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss'
})
export class GettingStartedComponent {
  public get availableLightFarmersHtml(): string {
    const lightFarmers = [{
      name: 'Foxy-Farmer',
      link: 'https://docs.foxypool.io/proof-of-spacetime/foxy-farmer/',
    }, {
      name: 'Fast Farmer',
      link: 'https://docs.foxypool.io/proof-of-spacetime/fast-farmer/',
    }]

    return lightFarmers.map(lightFarmer => `<a href="${lightFarmer.link}" target="_blank">${lightFarmer.name}</a>`).join(', ')
  }

  protected readonly faCheck = faCheck
  protected readonly faArrowRight = faArrowRight
  protected readonly titleImageUrl$: Observable<string>

  public constructor(private readonly themeProvider: ThemeProvider) {
    this.titleImageUrl$ = this.themeProvider.theme$.pipe(
      map(theme => theme === Theme.dark ? 'https://static.foxypool.io/assets/cover/statuspage.png' : 'https://static.foxypool.io/assets/cover/foxypool.io-white-bg.png'),
    )
  }
}
