import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from '../../server/data.service';
import { HeaderComponent } from './layout/header/header.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { reducers } from './store/reducers';
import { TodosEffects } from './store/effects';
import { MatDialogModule } from '@angular/material/dialog';
import { PopPupComponent } from './shared/modals/pop-pup/pop-pup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './shared/modals/confirmation-modal/confirmation-modal/confirmation-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopPupComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument(),
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forFeature([TodosEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
