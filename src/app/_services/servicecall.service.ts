import { Injectable, EventEmitter } from '@angular/core';
//import { Http,Headers, Response, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../_modals/appSettings';
import { StorageService } from '../_services/storage.service';
//@Component({
//    providers: [ServiceCall]
//})
@Injectable()
export class ServiceCall {
    public errorMessage: String;
    public AccessToken: string = "";
     UserDataKey = "UserData";
     UserData: any;
    constructor(private http: HttpClient, private storageService: StorageService) {
    }
    PostCall(apiName: string = "", para: any = null): Observable<any> {
        
        //this.UserData = this.storageService.read(this.UserDataKey);
        let headers = new HttpHeaders();
        let options: any = null;
        // if (this.UserData != null && this.UserData.AccessToken)
        //     if (this.UserData.AccessToken) {
        //         this.AccessToken = this.UserData.AccessToken;
        //     }
        headers = headers.set('Content-Type', 'application/json');
        // headers = headers.set('Authorization', 'Bearer ' + this.AccessToken);
        headers = headers.set('Accept', 'application/json');
        var parameter = null;
        if (para != undefined && para != null) {
            if (this.AccessToken != null && this.AccessToken != '') {
                para.Token = this.AccessToken;
            }
            parameter = JSON.stringify(para);
        }
        return this.http.post(apiName, parameter, {
                headers: headers
            })
            // .map(result => {
            //     return result;
            // },(err: HttpErrorResponse) => {
            // });
        //return null;
    }
    PostCallByMultipart(apiName: string, formData: FormData): Observable<any> {
        this.UserData = this.storageService.read(this.UserDataKey);
        return Observable.create(observer => {
            if (this.UserData != null && this.UserData.AccessToken) {
                if (this.UserData.AccessToken) {
                    this.AccessToken = this.UserData.AccessToken;
                }
            }
            //formData.append("AccessToken", this.AccessToken);
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                // this.progress = Math.round(event.loaded / event.total * 100);
                //this.progressObserver.next(this.progress);
            };
            xhr.open('POST', apiName, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.AccessToken);
            xhr.send(formData);
        });
    }
    GetCall(apiName: string = "", para: any = null): Observable<any> {
        // return this.http.get(apiName, {
        // }).map(result => {
        //     return result;
        // }, (err: HttpErrorResponse) => {
        // });
        return null;
    }
}