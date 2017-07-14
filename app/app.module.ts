import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";

import { AppComponent }   from './app.component';
import { SetupComponent }   from './setup.component';
import { ForecastComponent }   from './forecast.component';

const appRoutes: Routes = [
    { path: 'setup', component: SetupComponent },
    { path: 'forecast', component: ForecastComponent },
    // { path: '',
    //     pathMatch: 'full',
    //     component: ForecastComponent
    // },
    { path: '**', redirectTo: 'forecast' }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot(appRoutes),
        Ng2CompleterModule
    ],
    declarations: [ AppComponent, SetupComponent, ForecastComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }