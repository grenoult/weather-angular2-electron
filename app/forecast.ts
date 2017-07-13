export class Forecast {
    constructor(
        public consolidatedWeather: any[] = [],
        public locationTitle: string = null,
    ) {}
}