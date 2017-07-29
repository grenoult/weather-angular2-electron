import {Component, NgZone, OnInit, OnDestroy} from '@angular/core';
import { DataService } from './app.service';
import { Setup } from './setup';
import { Forecast } from "./forecast";
import { Router } from "@angular/router";
// import { Moment } from "moment";
import * as moment from 'moment/moment';

// To interact with Electron
const {ipcRenderer} = require('electron');

@Component({
    selector: 'forecast',
    moduleId: module.id,
    templateUrl: 'forecast.component.html',
    providers: [DataService]
})
export class ForecastComponent implements OnInit, OnDestroy {

    setupLoaded: boolean = false;

    forecastLoaded: boolean = false;

    forecast: Forecast = new Forecast();

    setup: Setup = new Setup();

    setupUnitDisplay: string = '';

    nowDay: string;

    nowTime: string;

    timer: number;

    constructor(private dataService: DataService, private zone: NgZone, private router: Router) {
    }

    /**
     * On init, load user settings, forecast and timer.
     */
    ngOnInit() {
        ipcRenderer.send('load-user-settings');

        ipcRenderer.on('load-user-settings-reply', function(event, arg) {
            if (arg === false) {
                // If user has no setting => setup page
                this.router.navigate(['/setup']);
            }

            let data = JSON.parse(arg);
            this.loadSetupData(data);
            this.loadForecast();

            // Update date and time every second
            if (!this.timer) {
                this.timer = setInterval(()=> {
                    this.updateTime();
                }, 1000);
            }

        }.bind(this));
    }

    /**
     * Load setup from local storage.
     *
     * @param {{}} userData
     */
    loadSetupData(userData: {}) {
        if (userData['location'] && userData['unit']) {
            this.setup.location = userData['location'];
            this.setup.unit = userData['unit'];
            this.setupUnitDisplay = Setup.getUnitShortText(this.setup.unit);
        }
        this.setupLoaded = true;
        this.refreshZone();
    }

    /**
     * Loads weather forecast data from remote.
     *
     * @returns {boolean} False if no setup data, true otherwise.
     */
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

                if (+this.setup.unit == Setup.UNIT_FAHRENHEIT) {
                    for (let i in this.forecast.consolidatedWeather) {
                        // Convert min temp from C to F
                        let temp = this.forecast.consolidatedWeather[i].min_temp;
                        temp = temp * 9 / 5 + 32;
                        this.forecast.consolidatedWeather[i].min_temp = temp;

                        // Convert max temp from C to F
                        temp = this.forecast.consolidatedWeather[i].max_temp;
                        temp = temp * 9 / 5 + 32;
                        this.forecast.consolidatedWeather[i].max_temp = temp;
                    }
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

    /**
     * Update day and time to indicate time.
     */
    updateTime() {
        this.nowDay = moment().format('dddd, Do MMMM YYYY');
        this.nowTime = moment().format('HH:mm:ss');
        this.refreshZone();
    }

    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }


}