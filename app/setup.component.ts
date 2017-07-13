import { Component } from '@angular/core';
import { Setup } from './setup';
import { DataService } from './app.service';

@Component({
    selector: 'setup',
    moduleId: module.id,
    templateUrl: 'setup.component.html',
    providers: [DataService]
})
export class SetupComponent {

    constructor(private dataService: DataService) {

    }

    /**
     * Store type of temperature unit in an array.
     * @type {number[]}
     */
    temperatureUnitValues: number[] = Setup.getUnits();

    /**
     * Get temperature Unit text.
     *
     * @param unit
     * @returns {string}
     */
    getTemperatureUnitTexts(unit: number) {
        return Setup.getUnitText(unit);
    }

    model = new Setup(0, '');

    locationSearch: string;

    locationSearchResult: any[] = [];

    locationSearchCount: number;

    searchLocation() {
        this.dataService.queryLocation(this.locationSearch).then(function(res){
            this.locationSearchResult = res.json();
            this.locationSearchCount = this.locationSearchResult.length;
        }.bind(this));
        console.log(this.locationSearch);
    }

    save() {
        // TODO persist in local storage
        console.log(this.model);
    }

}