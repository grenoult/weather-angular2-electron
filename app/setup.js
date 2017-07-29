"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UNIT_FAHRENHEIT = 0;
const UNIT_CELSIUS = 1;
class Setup {
    constructor(unit = 1, location = null, // woeid
        locationTitle = null) {
        this.unit = unit;
        this.location = location;
        this.locationTitle = locationTitle;
    }
    static getUnitText(unit) {
        switch (unit) {
            case UNIT_FAHRENHEIT:
                return 'Fahrenheit';
            case UNIT_CELSIUS:
                return 'Celsius';
        }
        return '';
    }
    static getUnitShortText(unit) {
        switch (unit) {
            case UNIT_FAHRENHEIT:
                return '°F';
            case UNIT_CELSIUS:
                return '°C';
        }
        return '';
    }
    static getUnits() {
        return [
            UNIT_FAHRENHEIT,
            UNIT_CELSIUS
        ];
    }
}
exports.Setup = Setup;
//# sourceMappingURL=setup.js.map