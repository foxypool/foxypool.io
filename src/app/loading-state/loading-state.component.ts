import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-state',
  templateUrl: './loading-state.component.html',
  styleUrls: ['./loading-state.component.scss']
})
export class LoadingStateComponent {
  @Input() width = 3;
  @Input() height = 3;
  @Input() fontSize = 'inherit';

  constructor() { }
}
