import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  mainLoading: Observable<boolean>;

  private mainLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.mainLoading = this.mainLoadingSubject.asObservable();
  }

  setMainLoading(loading: boolean): void {
    this.mainLoadingSubject.next(loading);
  }
}
