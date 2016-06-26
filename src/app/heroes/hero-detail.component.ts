import {Component, OnInit, OnDestroy, EventEmitter, Input, Output} from "@angular/core";
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
            <div class="detail-buttons">
                <button (click)="gotoHeroes()">Back</button>
                <button (click)="save()">Save</button>
            </div>
        </div>
    `
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    @Input() hero:Hero;
    @Output() close = new EventEmitter();

    error:any;
    navigated = false;

    private sub:any;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private service:HeroService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];

            if (id !== 0) {
                this.navigated = true;
                this.service
                    .getHero(id)
                    .then(hero => this.hero = hero);
            } else {
                this.navigated = false;
                this.hero = new Hero(null, '');
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    gotoHeroes() {
        let heroId = this.hero ? this.hero.id : null;

        this.router.navigate(['/heroes'], {queryParams: {id: heroId}});
    }

    save() {
        this.service
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.close.emit(hero);
                this.gotoHeroes();
            })
            .catch(error => this.error = error);
    }

}
