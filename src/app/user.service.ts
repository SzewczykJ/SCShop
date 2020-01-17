import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
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
        return this.http.get<myData>('/api/dashboard')
    }

    isLoggedIn(): Observable<isLoggedIn> {
        return this.http.get<isLoggedIn>('/api/isloggedin')
    }

    logout() {
        return this.http.get<logoutStatus>('/api/logout')
    }

}