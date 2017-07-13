import { Component } from '@angular/core';
import { Setup } from './setup';
import { DataService } from './app.service';

@Component({
    selector: 'forecast',
    moduleId: module.id,
    templateUrl: 'forecast.component.html',
    providers: [DataService]
})
export class ForecastComponent {

    locationId: string;

    constructor(private dataService: DataService) {

    }

}