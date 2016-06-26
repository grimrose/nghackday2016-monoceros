import "../css/styles.css";

import {XHRBackend} from '@angular/http';
import {InMemoryBackendService, SEED_DATA} from 'angular2-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';


import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from "./app.component";
import {APP_ROUTER_PROVIDERS} from "./app.routes";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    {provide: XHRBackend, useClass: InMemoryBackendService},
    {provide: SEED_DATA, useClass: InMemoryDataService},
    APP_ROUTER_PROVIDERS
])
    .catch(err => console.error(err));
