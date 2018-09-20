import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../_modals/appSettings';
import { ServiceCall } from './servicecall.service'

@Injectable()
export class AddressBookService {

    constructor(private obj: ServiceCall) {
    }
    AddAddressBook(book: any): Observable<any> {
        return this.obj.PostCall(AppSettings.AddAddressBook, book);
    }
    GetAddressBookList(user: any): Observable<any> {
        return this.obj.PostCall(AppSettings.GetAddressBookList, user);
    }
    GetAddressBookById(obj: any): Observable<any> {
        return this.obj.PostCall(AppSettings.GetAddressBookById, obj);
    }
    DeleteAddressBookById(obj: any): Observable<any> {
        return this.obj.PostCall(AppSettings.DeleteAddressBookById, obj);
    }
}