import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Setup } from './setup';
import { DataService } from './app.service';

// To interact with Electron
const {ipcRenderer} = require('electron');

@Component({
    selector: 'setup',
    moduleId: module.id,
    templateUrl: 'setup.component.html',
    providers: [DataService]
})
export class SetupComponent {

    constructor(private dataService: DataService, private router: Router) {

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

    locationSearchResult: any[] = [];

    locationSearchCount: number;

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