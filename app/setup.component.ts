import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Setup } from './setup';
import { DataService } from './app.service';
import { CompleterService, CompleterData } from 'ng2-completer';

// To interact with Electron
const {ipcRenderer} = require('electron');

@Component({
    selector: 'setup',
    moduleId: module.id,
    templateUrl: 'setup.component.html',
    providers: [DataService]
})
export class SetupComponent {

    constructor(private dataService: DataService, private router: Router, private completerService: CompleterService) {
        // this.locationService = dataService.;
        this.locationRemote = this.completerService.remote(
            'https://www.metaweather.com/api/location/search/?',
            'query',
            'location'
        );
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

    model = new Setup();

    locationSearch: string;

    locationSearchTest: string;

    locationSearchResult: any[] = [];

    locationSearchCount: number;

    locationRemote: CompleterData;

    searchLocation() {
        this.dataService.queryLocation(this.locationSearch).then(function(res){
            this.locationSearchResult = res.json();
            this.locationSearchCount = this.locationSearchResult.length;
        }.bind(this));
    }

    save() {
        ipcRenderer.send('save-user-settings', this.model);

        ipcRenderer.on('save-user-settings-reply', function(event, arg) {
            this.router.navigate(['/forecast']);
        }.bind(this));
    }

}