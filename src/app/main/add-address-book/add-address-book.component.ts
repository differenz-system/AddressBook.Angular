import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';
import { AddressBookService } from '../../_services/address-book.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidator } from '../../_services/validators.service';
import { HandleErrors } from '../../_services/commonFunctions';
import { AddressBookModel } from '../../_modals/address-book';
import { ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'add-address-book.',
    templateUrl: 'add-address-book.component.html'
})
export class AddAddressComponent implements OnInit {
    title = 'Add New Address';
    addAddressFormGroup: FormGroup;
    current_user_id: Number = 0;
    current_address_book_id: Number = 0;
    first_name: FormControl;
    last_name: FormControl;
    email_id: FormControl;
    is_active: FormControl;
    contact_no: FormControl;
    newBook: any;

    constructor(private storageService: StorageService,
        private router: Router,
        private toastrService: ToastrService,
        private handleErrors: HandleErrors,
        private addressBookService: AddressBookService,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
        var that = this;
        this.route.params.subscribe(function (params) {
            if (params && params.id) {
                that.title = 'Update Address';
                that.current_address_book_id = Number(params.id);
                that.GetDataForEdit();
            }
            else {
                this.current_address_book_id = 0;
            }
        });

        this.titleService.setTitle('Differenz - Add New Address');
    }
    ngOnInit() {
        var UserDataKey = "UserData";
        let UserData: any = this.storageService.read(UserDataKey);
        if (UserData && UserData.user_id) {
            this.current_user_id = UserData.user_id;
        }
        this.createFormControls();
        this.createForm();
    }
    BindData(data) {
        this.addAddressFormGroup.controls['email_id'].setValue(data.email_id);
        this.addAddressFormGroup.controls['first_name'].setValue(data.first_name);
        this.addAddressFormGroup.controls['last_name'].setValue(data.last_name);
        this.addAddressFormGroup.controls['contact_no'].setValue(data.contact_no);
        this.addAddressFormGroup.controls['is_active'].setValue(data.is_active);
    }
    GetDataForEdit() {
        var obj = {
            address_book_id: this.current_address_book_id
        }
        this.addressBookService.GetAddressBookById(obj)
            .subscribe((data: any) => {
                if (data.IsSuccess) {
                    this.BindData(data.data);
                }
            }, error => {
                this.handleErrors.HandleError(<any>error, this.toastrService);
            });
    }
    ResetForm() {
        if (this.addAddressFormGroup) {
            this.addAddressFormGroup.reset();
        }
    }
    createFormControls() {
        this.is_active = new FormControl(true);
        this.contact_no = new FormControl('', [Validators.required]);
        this.email_id = new FormControl('', [Validators.required, EmailValidator.mailFormat]);
        this.first_name = new FormControl('', [Validators.required]);
        this.last_name = new FormControl('', [Validators.required]);
    }
    createForm() {
        this.addAddressFormGroup = new FormGroup({
            first_name: this.first_name,
            last_name: this.last_name,
            is_active: this.is_active,
            email_id: this.email_id,
            contact_no: this.contact_no
        });
    }
    Save() {
        if (this.addAddressFormGroup.valid) {
            this.newBook = new AddressBookModel(this.addAddressFormGroup.value);
            this.newBook.address_book_id = this.current_address_book_id;
            this.newBook.user_id = this.current_user_id;
            this.addressBookService.AddAddressBook(this.newBook)
                .subscribe((Data: any) => {
                    if (Data.IsSuccess) {
                        this.toastrService.success(Data.msg);
                        this.ResetForm();
                        this.router.navigate(['address-book']);
                    }
                    else {
                        this.toastrService.error(Data.msg);
                    }
                },
                    error => {
                        this.handleErrors.HandleError(<any>error, this.toastrService);
                    });
        }
        else {
            this.addAddressFormGroup.controls['first_name'].markAsTouched();
            this.addAddressFormGroup.controls['last_name'].markAsTouched();
            this.addAddressFormGroup.controls['email_id'].markAsTouched();
            this.addAddressFormGroup.controls['contact_no'].markAsTouched();
        }
    }
    Cancel() {
        this.router.navigate(['address-book']);
    }
}
