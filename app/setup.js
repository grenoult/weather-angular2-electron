"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Setup {
    constructor(unit = 1, location = null, // woeid
        locationTitle = null) {
        this.unit = unit;
        this.location = location;
        this.locationTitle = locationTitle;
    }
    static getUnitText(unit) {
        switch (unit) {
            case this.UNIT_FAHRENHEIT:
                return 'Fahrenheit';
            case this.UNIT_CELSIUS:
                return 'Celsius';
        }
        return '';
    }
    static getUnitShortText(unit) {
        switch (+unit) {
            case this.UNIT_FAHRENHEIT:
                return '°F';
            case this.UNIT_CELSIUS:
                return '°C';
        }
        return '';
    }
    static getUnits() {
        return [
            this.UNIT_FAHRENHEIT,
            this.UNIT_CELSIUS
        ];
    }
}
Setup.UNIT_FAHRENHEIT = 0;
Setup.UNIT_CELSIUS = 1;
exports.Setup = Setup;
//# sourceMappingURL=setup.js.map