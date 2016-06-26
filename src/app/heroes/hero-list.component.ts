import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {Hero, HeroService} from './hero.service';

@Component({
    template: `
    <h2>Heroes</h2>
    <button (click)="addHero()">Add New Hero</button>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
        <button class="delete-button" (click)="delete(hero, $event)">
            Delete
        </button>
      </li>
    </ul>
    <div *ngIf="addingHero">
        <my-hero-detail (close)="close($event)"></my-hero-detail>
    </div>
    <div *ngIf="selectedHero">
        <h2>
            {{selectedHero.name | uppercase}} is my hero
        </h2>
        <button (click)="gotoDetail()">View Details</button>
    </div>
  `
})
export class HeroListComponent implements OnInit, OnDestroy {
    heroes:Hero[];

    selectedHero:Hero;
    addingHero = false;

    error:any;

    private selectedId:number;
    private sub:any;

    constructor(private service:HeroService,
                private router:Router) {
    }

    ngOnInit() {
        this.sub = this.router
            .routerState
            .queryParams
            .subscribe(params => {
                this.selectedId = +params['id'];
                this.getHeroes();
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isSelected(hero:Hero) {
        if (hero && this.selectedHero) {
            return hero.id === this.selectedHero.id;
        }
        return false;
    }

    onSelect(hero:Hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    }

    gotoDetail() {
        let id = 0;
        if (this.selectedHero) {
            id = this.selectedHero.id;
        }
        this.router.navigate(['/hero', id]);
    }

    getHeroes() {
        this.service
            .getHeroes()
            .then(heroes => this.heroes = heroes)
            .catch(error => this.error = error);
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
        this.gotoDetail();
    }

    close(savedHero:Hero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    }

    delete(hero:Hero, event:any) {
        event.stopPropagation();
        this.service
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            })
            .catch(error => this.error = error);
    }

}
