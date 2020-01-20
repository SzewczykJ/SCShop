import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

    form: FormGroup;
    planets: Planets[];
    species: Species[];
    selectedValue = null;
    constructor(private User: UserService,
        private router: Router,
        private http: HttpClient,
        private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            nickname: ['', Validators.required],
            password: ['', Validators.required],
            species_id: [''],
            planets_id: ['']
        });
        this.getAllPlanets();
        this.getAllSpecies();
    }

    ngOnInit() {

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
    submit() {
        console.log(this.form.value);
        if (this.form.valid) {
            this.User.register(this.form.value).subscribe(data => {
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

}
