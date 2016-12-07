import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { LocalizeRouterModule, StaticParserLoader, LocalizeParser } from 'localize-router';

import { AppComponent } from './app.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/locales', '.json');
}

export function localizeLoaderFactory(translate: TranslateService, http: Http) {
  return new StaticParserLoader(translate, http);
}

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      provide: LocalizeParser,
      useFactory: localizeLoaderFactory,
      deps: [TranslateService, Http]
    }),
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
