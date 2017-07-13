const UNIT_FAHRENHEIT = 0;
const UNIT_CELSIUS = 1;

export class Setup {
    constructor(
        public unit: number,
        public location: string,
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

    static getUnits() {
        return [
            UNIT_FAHRENHEIT,
            UNIT_CELSIUS
        ];
    }
}