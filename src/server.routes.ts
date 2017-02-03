/**
 * Server-side routes. Only the listed routes support html5pushstate.
 * Has to match client side routes.
 *
 * Index (/) route does not have to be listed here.
 *
 * @example
 * export const routes: string[] = [
 * 'home', 'about'
 * ];
 **/
let fs = require('fs');
let data: any = JSON.parse(fs.readFileSync(`src/assets/locales.json`, 'utf8'));

export const routes: string[] = data.locales;
