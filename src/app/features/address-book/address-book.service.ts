import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../core/config/api-endpoints';
import { Observable } from 'rxjs';
import { AddressBook } from 'src/app/core/models/address-book.model';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  constructor(private http: HttpClient) { }

  getAll(userId: number): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.addressBook.list}/${userId}`);
  }

  update(data: AddressBook): Observable<any> {
    return this.http.put(`${API_ENDPOINTS.addressBook.update}/${data.user_id}/${data.address_id}`, data);
  }

  add(data: AddressBook): Observable<any> {
    return this.http.post(API_ENDPOINTS.addressBook.add, data);
  }

  delete(user_id: number,address_id: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.addressBook.delete}/${user_id}/${address_id}`);
  }

  private selectedAddress: any;

  setSelectedAddress(data: any) {
    this.selectedAddress = data;
  }

  getSelectedAddress() {
    return this.selectedAddress;
  }
}
