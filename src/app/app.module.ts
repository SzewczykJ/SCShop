import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { UserService } from './user.service';
import { OnlyWithPermissionGuardGuard } from './only-with-permission-guard.guard';
import { RegisterComponent } from './users/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminComponent,
        HomeComponent,
        LogoutComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [AuthGuard, OnlyWithPermissionGuardGuard, AuthService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
