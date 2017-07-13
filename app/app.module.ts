import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }   from './app.component';
import { SetupComponent }   from './setup.component';

const appRoutes: Routes = [
    { path: 'setup', component: SetupComponent },
    // { path: 'forecast', component: HeroDetailComponent },
    { path: '',
        pathMatch: 'full',
        component: SetupComponent
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, RouterModule.forRoot(appRoutes) ],
    declarations: [ AppComponent, SetupComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }