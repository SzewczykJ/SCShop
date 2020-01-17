import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private Auth: AuthService, private router: Router) { }

    ngOnInit() {
    }

    loginUser(event) {
        event.preventDefault()
        const target = event.target
        const nick = target.querySelector("#nick").value
        const password = target.querySelector("#password").value

        this.Auth.getUserDetails(nick, password).subscribe(data => {
            if (data.success) {
                this.router.navigate(['admin'])
                this.Auth.setLoggedIn(true)
            } else {
                window.alert(data.message)
            }
        })
    }

}
