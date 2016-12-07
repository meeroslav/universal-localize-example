import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TranslateModule } from 'ng2-translate';
import { LocalizeRouterModule } from 'localize-router';

let routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }