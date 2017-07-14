import { Injectable }    from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
    rootUrl: string;

    constructor(private http: Http) {
        this.rootUrl = 'https://www.metaweather.com/api/';
    }

    queryLocation(locationSearch: string) {
        // TODO make this query better
        return this.http.get(this.rootUrl + 'location/search/?query='+locationSearch)
            .toPromise();
    }

    queryForecast(locationId: string) {
        // TODO make this query better
        return this.http.get(this.rootUrl + 'location/'+locationId+'/')
            .toPromise();
    }
}