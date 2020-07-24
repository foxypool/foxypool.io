import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showInfoToast(msg, title = '', options = {}) {
    options = Object.assign({
      timeOut: 3000,
      progressBar: true,
      tapToDismiss: false,
    }, options);
    this.toastr.info(msg, title, options);
  }
}
