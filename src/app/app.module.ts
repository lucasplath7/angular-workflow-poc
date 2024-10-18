import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppBanner } from './layout/app-banner/app-banner.component';
import { AppComponent } from './app.component';
import { AppFooter } from './layout/app-footer/app-footer.component';
import { AppMainContent } from './layout/app-main-content/app-main-content.component';
import { AppNav } from './layout/app-nav/app-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UsersService } from './services/users-service.service';


@NgModule({
  declarations: [
    AppBanner,
    AppComponent,
    AppFooter,
    AppMainContent,
    AppNav,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [
    AppComponent
  ],
  providers: [UsersService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
