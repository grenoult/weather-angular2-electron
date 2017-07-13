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

    // /**
    //  * Get fields available for generating data.
    //  *
    //  * @returns {Promise<T>}
    //  */
    // getFields() {
    //     return this.http.get(this.rootUrl + 'fields')
    //         .toPromise();
    // }
    //
    // /**
    //  * Send query to server to get fields.
    //  * Parameter queryField should be similar to:
    //  *  {"queryFields":[{"id":0,"type":"integer","subtype":"negative","fieldId":"0","name":"123"}],"records":10}
    //  *
    //  * @param queryFields
    //  * @returns {Promise<T>}
    //  */
    // submitForm(queryFields: {}) {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     let query = {
    //         query: JSON.stringify(queryFields)
    //     };
    //
    //     return this.http.post(
    //         this.rootUrl + 'generate',
    //         query,
    //         options
    //     ).toPromise();
    // }
}