const UNIT_FAHRENHEIT = 0;
const UNIT_CELSIUS = 1;

export class Setup {
    constructor(
        public unit: number = 1,
        public location: string = null, // woeid
        public locationTitle: string = null
    ) {}

    static getUnitText (unit) {
        switch (unit) {
            case UNIT_FAHRENHEIT:
                return 'Fahrenheit';
            case UNIT_CELSIUS:
                return 'Celsius';
        }
        return '';
    }

    static getUnitShortText (unit) {
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