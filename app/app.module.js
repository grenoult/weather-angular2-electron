"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const router_1 = require("@angular/router");
const ng2_completer_1 = require("ng2-completer");
const app_component_1 = require("./app.component");
const setup_component_1 = require("./setup.component");
const forecast_component_1 = require("./forecast.component");
const appRoutes = [
    { path: 'setup', component: setup_component_1.SetupComponent },
    { path: 'forecast', component: forecast_component_1.ForecastComponent },
    // { path: '',
    //     pathMatch: 'full',
    //     component: ForecastComponent
    // },
    { path: '**', redirectTo: 'forecast' }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            router_1.RouterModule.forRoot(appRoutes),
            ng2_completer_1.Ng2CompleterModule
        ],
        declarations: [app_component_1.AppComponent, setup_component_1.SetupComponent, forecast_component_1.ForecastComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map