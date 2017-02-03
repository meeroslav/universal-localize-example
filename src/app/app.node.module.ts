/**
 * This file and `main.node.ts` are identical, at the moment(!)
 * By splitting these, you're able to create logic, imports, etc that are "Platform" specific.
 * If you want your code to be completely Universal and don't need that
 * You can also just have 1 file, that is imported into both
 * client.ts and server.ts
 */

import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from 'ng2-translate';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule, LocalizeParser } from 'localize-router';

import { AppComponent } from './index';
import { HomeModule } from './home/home.module';
import { Observable } from 'rxjs/Observable';

let fs = require('fs');

export class TranslateUniversalLoader implements TranslateLoader {
  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      observer.next(JSON.parse(fs.readFileSync(`/assets/locales/${lang}.json`, 'utf8')));
      observer.complete();
    });
  }
}

export class LocalizeUniversalLoader extends LocalizeParser {
  /**
   * Gets config from the server
   * @param routes
   */
  public load(routes: Routes): Promise<any> {
    return new Promise((resolve: any) => {
      let data: any = JSON.parse(fs.readFileSync(`src/assets/locales.json`, 'utf8'));
      this.locales = data.locales;
      this.prefix = data.prefix;
      this.init(routes).then(resolve);
    });
  }
}

export function localizeLoaderFactory(translate: TranslateService) {
  return new LocalizeUniversalLoader(translate);
}

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

/**
 * Top-level NgModule "container"
 */
@NgModule({
  /** Root App Component */
  bootstrap: [ AppComponent ],
  /** Our Components */
  declarations: [ AppComponent ],
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * BrowserModule, HttpModule, and JsonpModule are included
     */
    FormsModule,
    /**
     * using routes
     */
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: TranslateUniversalLoader
    }),
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      provide: LocalizeParser,
      useFactory: localizeLoaderFactory,
      deps: [TranslateService]
    }),
    HomeModule,
    UniversalModule
  ]
})
export class AppModule {

}

