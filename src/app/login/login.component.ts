import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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

        this.Auth.getAuthorize(nick, password).subscribe(data => {
            if (data.LoggedIn == true) {
                this.Auth.setLoggedIn(true)
                this.Auth.setSpecies(data.Species);

                if (data.Species === environment.privilegedSpecies) {
                    //redirect privileged species to the management panel
                    this.router.navigate(['admin'])
                } else {
                    //redirect to profile page

                    // this.router.navigate(['admin'])
                }
            } else {
                window.alert(data.Message)
                console.log(data.Message)
            }
        })
    }

}
