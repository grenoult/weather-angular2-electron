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
const router_1 = require("@angular/router");
const setup_1 = require("./setup");
const app_service_1 = require("./app.service");
const ng2_completer_1 = require("ng2-completer");
// To interact with Electron
const { ipcRenderer } = require('electron');
let SetupComponent = class SetupComponent {
    constructor(dataService, router, completerService) {
        this.dataService = dataService;
        this.router = router;
        this.completerService = completerService;
        /**
         * Store type of temperature unit in an array.
         * @type {number[]}
         */
        this.temperatureUnitValues = setup_1.Setup.getUnits();
        this.model = new setup_1.Setup();
        // this.locationService = dataService.;
        this.locationRemote = this.completerService.remote('https://www.metaweather.com/api/location/search/?query=', 'title', 'title');
    }
    ngOnInit() {
        ipcRenderer.send('load-user-settings');
        ipcRenderer.on('load-user-settings-reply', function (event, arg) {
            if (arg !== false) {
                this.model = JSON.parse(arg);
            }
        }.bind(this));
    }
    /**
     * Get temperature Unit text.
     *
     * @param unit
     * @returns {string}
     */
    getTemperatureUnitTexts(unit) {
        return setup_1.Setup.getUnitText(unit);
    }
    onLocationSelected($event) {
        if ($event.originalObject && $event.originalObject.woeid && $event.originalObject.title) {
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
        ipcRenderer.on('save-user-settings-reply', function (event, arg) {
            this.router.navigate(['/forecast']);
        }.bind(this));
    }
    /**
     * Cancel changes, go to forecast page.
     */
    cancel() {
        this.router.navigate(['/forecast']);
    }
};
SetupComponent = __decorate([
    core_1.Component({
        selector: 'setup',
        moduleId: module.id,
        templateUrl: 'setup.component.html',
        providers: [app_service_1.DataService]
    }),
    __metadata("design:paramtypes", [app_service_1.DataService, router_1.Router, ng2_completer_1.CompleterService])
], SetupComponent);
exports.SetupComponent = SetupComponent;
//# sourceMappingURL=setup.component.js.map