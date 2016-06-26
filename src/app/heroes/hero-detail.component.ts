import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Hero, HeroService} from "./hero.service";

@Component({
    selector: 'my-hero-detail',
    template: `
        <div *ngIf="hero">
            <h2>{{hero.name}} details!</h2>
            <div>
                <label>id: </label>{{hero.id}}
            </div>
            <div>
                <label>name: </label>
                <input [(ngModel)]="hero.name" placeholder="name"/>
            </div>
            <button (click)="gotoHeroes()">Back</button>
        </div>
    `
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    hero:Hero;

    private sub:any;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private service:HeroService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.service
                .getHero(id)
                .then(hero => this.hero = hero);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    gotoHeroes() {
        let heroId = this.hero ? this.hero.id : null;

        this.router.navigate(['/heroes'], {queryParams: {id: heroId}});
    }

    goBack() {
        window.history.back();
    }

}
