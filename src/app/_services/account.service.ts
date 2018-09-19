import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'
import { AppSettings } from '../_modals/appSettings';
import { ServiceCall } from './servicecall.service'

@Injectable()
export class AccountService {

    constructor(private obj: ServiceCall) {
    }
    RegisterUser(user: any): Observable<any> {
        return this.obj.PostCall(AppSettings.RegisterUser, user);
    }
    ValidateLogin(user: any): Observable<any> {
        return this.obj.PostCall(AppSettings.ValidateLogin, user);
    }
    // Logout(model: any): Observable<any> {
    //     return this.obj.PostCall(AppSettings.Logout, model);
    // }
    // GetSystemAdminData(): Observable<any> {
    //     return this.obj.PostCall(AppSettings.GetSystemAdminData);
    // }
}