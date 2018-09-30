import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FinancesModule } from '../modules/finances/finances.module';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { appRoutes } from './routes/app.routes';

import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../modules/shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AuthenticationModule,
    FinancesModule,
    SharedModule,
    environment.production ? ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }) : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
