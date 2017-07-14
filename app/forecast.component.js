"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const app_service_1 = require("./app.service");
const setup_1 = require("./setup");
const forecast_1 = require("./forecast");
const router_1 = require("@angular/router");
// import { Moment } from "moment";
const moment = require("moment/moment");
// To interact with Electron
const { ipcRenderer } = require('electron');
let ForecastComponent = class ForecastComponent {
    // timer: number;
    constructor(dataService, zone, router) {
        this.dataService = dataService;
        this.zone = zone;
        this.router = router;
        this.setupLoaded = false;
        this.forecastLoaded = false;
        this.forecast = new forecast_1.Forecast();
        this.setup = new setup_1.Setup();
        this.setupUnitDisplay = '';
    }
    ngOnInit() {
        ipcRenderer.send('load-user-settings');
        ipcRenderer.on('load-user-settings-reply', function (event, arg) {
            if (arg === false) {
                // If user has no setting => setup page
                this.router.navigate(['/setup']);
            }
            let data = JSON.parse(arg);
            this.loadSetupData(data);
            this.loadForecast();
            // Update date and time every second
            this.timer = setInterval(() => {
                this.updateTime();
            }, 1000);
        }.bind(this));
    }
    loadSetupData(userData) {
        if (userData['location'] && userData['unit']) {
            this.setup.location = userData['location'];
            this.setup.unit = userData['unit'];
            this.setupUnitDisplay = setup_1.Setup.getUnitShortText(this.setup.unit);
        }
        this.setupLoaded = true;
        this.refreshZone();
    }
    loadForecast() {
        if (!this.setupLoaded) {
            return false;
        }
        this.dataService.queryForecast(this.setup.location)
            .then(function (res) {
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
    refreshZone() {
        this.zone.run(() => void 0);
    }
    updateTime() {
        console.log('Update time!');
        this.nowDay = moment().format('dddd, Do MMMM YYYY');
        this.nowTime = moment().format('HH:mm:ss');
        this.refreshZone();
    }
    ngOnDestroy() {
        console.log('Destroy!');
        console.log(this.timer);
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
};
ForecastComponent = __decorate([
    core_1.Component({
        selector: 'forecast',
        moduleId: module.id,
        templateUrl: 'forecast.component.html',
        providers: [app_service_1.DataService]
    }),
    __metadata("design:paramtypes", [app_service_1.DataService, core_1.NgZone, router_1.Router])
], ForecastComponent);
exports.ForecastComponent = ForecastComponent;
//# sourceMappingURL=forecast.component.js.map