import {ApplicationRef, Injectable} from '@angular/core';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker'
import {ToastService} from './toast.service';
import {filter, first} from 'rxjs/operators'
import {concat, interval} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(
    swUpdate: SwUpdate,
    toastService: ToastService,
    appRef: ApplicationRef,
  ) {
    if (!swUpdate.isEnabled) {
      return;
    }
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(async () => {
        toastService.showInfoToast('Updating to the latest version ..', '', { timeOut: 2 * 1000 });
        await new Promise(resolve => setTimeout(resolve, 2 * 1000));
        await swUpdate.activateUpdate();
        document.location.reload();
      });

    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => swUpdate.checkForUpdate());
  }
}
