import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Info {
    success: boolean,
    message: string
}

@Injectable()
export class AuthService {

    private loggedInStatus = false

    constructor(private http: HttpClient) { }

    setLoggedIn(value: boolean) {
        this.loggedInStatus = value
    }

    get isLoggedIn() {
        return this.loggedInStatus
    }

    getUserDetails(nick, password) {
        // post these details to API server return user info if correct
        return this.http.post<Info>('/api/auth', {
            nick,
            password
        })
    }

}