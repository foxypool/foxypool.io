import {IndividualConfig, ToastrService} from 'ngx-toastr'
import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private readonly toastr: ToastrService) {}

  showInfoToast(msg, title = '', options: Partial<IndividualConfig> = {}) {
    options = Object.assign({
      timeOut: 3000,
      progressBar: true,
      tapToDismiss: false,
    }, options)
    this.toastr.info(msg, title, options)
  }

  showErrorToast(msg, title = '', options: Partial<IndividualConfig> = {}) {
    options = Object.assign({
      timeOut: 5000,
      progressBar: true,
      tapToDismiss: false,
    }, options)
    this.toastr.error(msg, title, options)
  }
}
