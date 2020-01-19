import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './users/register/register.component';
import { OnlyWithPermissionGuardGuard } from './only-with-permission-guard.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, OnlyWithPermissionGuardGuard]
    }
];

@NgModule({
    imports: [NgbModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
