import { Injectable } from '@angular/core'
import {ToastService} from './toast.service'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public constructor(private readonly toastService: ToastService) {
    const localStorageException = this.getAccessException()
    if (localStorageException !== undefined) {
      this.toastService.showErrorToast(localStorageException.makeToastErrorMessage(), '', {
        disableTimeOut: true,
        tapToDismiss: true,
      })
    }
  }

  public getItem(key: string): string|null {
    return localStorage.getItem(key)
  }

  public setItem(key: string, value: string|null): void {
    localStorage.setItem(key, value)
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  private getAccessException(): DOMException|undefined {
    try {
      this.getItem('availability-check')
    } catch (err) {
      if (err instanceof DOMException) {
        return err
      }
    }
  }
}
