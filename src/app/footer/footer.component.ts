import { Component } from '@angular/core'
import {faDiscord, faGithub, faTelegram, faTwitter, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import * as moment from 'moment'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public faDiscord = faDiscord
  public readonly faTelegram = faTelegram
  public faGithub = faGithub
  public faXTwitter = faXTwitter

  public currentYear: string = moment().format('YYYY')
}
