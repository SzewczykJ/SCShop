import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../environments/environment';
/* todo: poprawić odbierane dane dla zaplecza */
interface myData {
    message: string,
    success: boolean
}

interface isLoggedIn {
    status: boolean
}

interface logoutStatus {
    success: boolean
}
@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getSomeData() {

        return this.http.get<myData>(environment.apiUrl + '/api/dashboard').subscribe(
            data => console.log('success', data),
            error => console.log('oops', error)
        );
    }

    isLoggedIn<isLoggedIn>(): Observable<isLoggedIn> {
        return this.http.get<isLoggedIn>(environment.apiUrl + '/api/isloggedin')
    }

    logout() {
        return this.http.get<logoutStatus>(environment.apiUrl + '/api/logout')
    }

}