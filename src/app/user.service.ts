import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../environments/environment';
/* todo: poprawić odbierane dane dla zaplecza */
interface myData {
    LoggedIn: boolean,
    Message: string,
    Species: any
}

interface isLoggedIn {
    status: boolean
}
interface isPrivileged {
    Speccies: boolean
}

interface logoutStatus {
    success: boolean
}
interface Message {
    Message: boolean
}
@Injectable()
export class UserService {


    constructor(private http: HttpClient) { }

    getSomeData() {

        return this.http.get<myData>(environment.apiUrl + '/api/dashboard/')
    }

    isPrivileged(): Observable<isPrivileged> {
        return this.http.get<isPrivileged>(environment.apiUrl + '/api/isprivileged')
    }
    isLoggedIn(): Observable<isLoggedIn> {
        return this.http.get<isLoggedIn>(environment.apiUrl + '/api/isloggedin/')
    }

    logout() {
        return this.http.get<logoutStatus>(environment.apiUrl + '/api/logout/')
    }

    register(value: any) {
        return this.http.post<Message>(environment.apiUrl + '/api/register/', value)
    }
}