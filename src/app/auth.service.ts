import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../environments/environment';

interface AuthorizeStatus {
    LoggedIn: boolean,
    Message: string,
    Species: any
}

@Injectable()
export class AuthService {

    private loggedInStatus = false
    private Species: string;

    constructor(private http: HttpClient) { }

    setLoggedIn(value: boolean) {
        this.loggedInStatus = value
    }

    setSpecies(value: string) {
        this.Species = value
    }

    getSpecies() {
        return this.Species
    }
    isPrivileged(): boolean {
        if (environment.privilegedSpecies == this.Species) {
            return true;
        } else {
            return false;
        }
    }
    isLoggedIn() {
        return this.loggedInStatus
    }

    getAuthorize(nickname, password) {
        // send user credentials to api to login
        return this.http.post<AuthorizeStatus>(environment.apiUrl + '/api/auth', {
            nickname,
            password
        })
    }

}