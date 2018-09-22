import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FinancesModule } from '../modules/finances/finances.module';
import { AuthenticationModule } from '../modules/authentication/authentication.module';
import { appRoutes } from './routes/app.routes';

import { InfoComponent } from './components/info/info.component';
import { SharedModule } from '../modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AuthenticationModule,
    FinancesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
