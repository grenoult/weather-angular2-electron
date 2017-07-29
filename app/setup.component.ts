import {Component, OnInit} from '@angular/core';
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
export class SetupComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router, private completerService: CompleterService) {
        // this.locationService = dataService.;
        this.locationRemote = this.completerService.remote(
            'https://www.metaweather.com/api/location/search/?query=',
            'title',
            'title'
        );
    }

    ngOnInit() {
        ipcRenderer.send('load-user-settings');

        ipcRenderer.on('load-user-settings-reply', function(event, arg) {
            if (arg !== false) {
                this.model = JSON.parse(arg);
            }
        }.bind(this))
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

    locationRemote: CompleterData;

    onLocationSelected($event) {
        if ($event && $event.originalObject && $event.originalObject.woeid && $event.originalObject.title) {
            this.model.location = $event.originalObject.woeid;
            this.model.locationTitle = $event.originalObject.title;
        }
    }

    /**
     * User saves settings.
     * Saves changes locally and redirect to forecast page.
     */
    save() {
        ipcRenderer.send('save-user-settings', this.model);

        ipcRenderer.on('save-user-settings-reply', function(event, arg) {
            this.router.navigate(['/forecast']);
        }.bind(this));
    }

    /**
     * Cancel changes, go to forecast page.
     */
    cancel() {
        this.router.navigate(['/forecast']);
    }

}