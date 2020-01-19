import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

interface Planets {
    Name: string,
    Id: number
}
interface Species {
    Name: string,
    Id: number
}



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

    planets: Planets[];
    species: Species[];
    selectedValue = null;
    constructor(private User: UserService, private router: Router, private http: HttpClient) { }

    ngOnInit() {
        this.planets = [{ Id: 1, Name: "United States" },
        { Id: 2, Name: "Australia" },
        { Id: 3, Name: "Canada" },
        { Id: 4, Name: "Brazil" },
        { Id: 5, Name: "England" }]
        this.species = [{ Id: 1, Name: "United" },
        { Id: 2, Name: "Aus" },
        { Id: 3, Name: "Can" },
        { Id: 4, Name: "Bra" },
        { Id: 5, Name: "Eng" }]
        // this.getAllPlanets();
        //this.getAllSpecies();
    }

    getAllSpecies() {
        this.http.get(environment.apiUrl + '/api/species/all').subscribe(data => {
            this.species = data as Species[];
        }, error => console.error(error))
    }

    getAllPlanets() {
        this.http.get(environment.apiUrl + '/api/planets/all').subscribe(data => {
            this.planets = data as Planets[];
        }, error => console.error(error))
    }

    register(event) {
        event.preventDefault()
        const target = event.target
        const nickname = target.querySelector("#nick").value
        const password = target.querySelector("#password").value
        const species_id = target.querySelector("#password").value
        const planets_id = target.querySelector("#password").value

        this.User.register(nickname, species_id, planets_id, password).subscribe(data => {
            if (data.Message === false) {
                window.alert("Error occured. Try again")
            }
            else {
                window.alert("Account created")
                this.router.navigate(['login'])
            }
        })
    }
}
