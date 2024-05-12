import { Component } from '@angular/core';
import { Observable, Subject, filter, merge, takeUntil, tap } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todos-app';
  loading$!: Observable<boolean>;

  private destroySubject = new Subject<void>();

  constructor(private loadingService: LoadingService, private router: Router) {}

  ngOnInit() {
    this.loading$ = this.loadingService.mainLoading;
  }

  ngAfterViewInit() {
    merge(this.navigationStartEvent(), this.navigationEndEvent())
      .pipe(takeUntil(this.destroySubject))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private navigationStartEvent(): Observable<any> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      tap(() => this.loadingService.setMainLoading(true))
    );
  }

  private navigationEndEvent(): Observable<any> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      tap(() => this.loadingService.setMainLoading(false))
    );
  }
}
