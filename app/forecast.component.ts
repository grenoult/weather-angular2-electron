import {Component, NgZone} from '@angular/core';
import { DataService } from './app.service';
import { Setup } from './setup';
import {Forecast} from "./forecast";

// To interact with Electron
const {ipcRenderer} = require('electron');

@Component({
    selector: 'forecast',
    moduleId: module.id,
    templateUrl: 'forecast.component.html',
    providers: [DataService]
})
export class ForecastComponent {

    setupLoaded: boolean = false;

    forecastLoaded: boolean = false;

    forecast: Forecast = new Forecast();

    setup: Setup = new Setup();

    setupUnitDisplay: string = '';

    constructor(private dataService: DataService, private zone: NgZone) {
        ipcRenderer.send('load-user-settings');

        ipcRenderer.on('load-user-settings-reply', function(event, arg) {
            let data = JSON.parse(arg);
            this.loadSetupData(data);
            this.loadForecast();

        }.bind(this));
    }

    loadSetupData(userData: {}) {
        if (userData['location'] && userData['unit']) {
            this.setup.location = userData['location'];
            this.setup.unit = userData['unit'];
            this.setupUnitDisplay = Setup.getUnitShortText(this.setup.unit);
        }
        this.setupLoaded = true;
        this.refreshZone();
    }

    loadForecast() {
        if (!this.setupLoaded) {
            return false;
        }

        this.dataService.queryForecast(this.setup.location)
            .then(function(res) {
                res = res.json();
                if (res['consolidated_weather'] && res['title']) {
                    this.forecast.consolidatedWeather = res['consolidated_weather'];
                    this.forecast.locationTitle = res['title'];
                }
                this.forecastLoaded = true;
                this.refreshZone();
            }.bind(this));

        return true;
    }

    /**
     * Refreshes Angular Zone.
     * Because Angular doesn't understand callbacks from IPC,
     * we need to refresh Angular Zone manually to make sure
     * data binding works properly between component and template.
     *
     */
    private refreshZone() {
        this.zone.run(()=>void 0);
    }

}