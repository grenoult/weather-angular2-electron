export class Setup {
    constructor(
        public unit: number = 1,
        public location: string = null, // woeid
        public locationTitle: string = null
    ) {}

    static UNIT_FAHRENHEIT = 0;
    static UNIT_CELSIUS = 1;

    static getUnitText (unit) {
        switch (unit) {
            case this.UNIT_FAHRENHEIT:
                return 'Fahrenheit';
            case this.UNIT_CELSIUS:
                return 'Celsius';
        }
        return '';
    }

    static getUnitShortText (unit) {
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