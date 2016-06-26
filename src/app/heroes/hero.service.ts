import {Injectable} from "@angular/core";

export class Hero {
    constructor(public id:number, public name:string) {
    }
}


let HEROES:Hero[] = [
    {id: 11, name: 'Mr. Nice'},
    {id: 12, name: 'Narco'},
    {id: 13, name: 'Bombasto'},
    {id: 14, name: 'Celeritas'},
    {id: 15, name: 'Magneta'},
    {id: 16, name: 'RubberMan'},
    {id: 17, name: 'Dynama'},
    {id: 18, name: 'Dr IQ'},
    {id: 19, name: 'Magma'},
    {id: 20, name: 'Tornado'},
    {id: 999, name: 'Vash the Stampede'}
];

let heroesPromise = Promise.resolve(HEROES);

@Injectable()
export class HeroService {
    getHeroes() {
        return heroesPromise;
    }

    getHero(id:number) {
        return this.getHeroes()
            .then(heroes => heroes.filter(hero => hero.id === +id)[0]);
    }

}
