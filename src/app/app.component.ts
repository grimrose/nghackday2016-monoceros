import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

import {HeroService}    from './heroes/hero.service';


@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
        <a [routerLink]="['/']">Dashboard</a>
        <a [routerLink]="['/heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>  
`,
    providers: [
        HeroService
    ],
    directives: [ROUTER_DIRECTIVES],
})
export class AppComponent {
    title = 'Tour of Heroes';
}
