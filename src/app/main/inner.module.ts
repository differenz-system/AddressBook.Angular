import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IndexInnerComponent } from './index.component'
import { InnerRoutingModule } from './inner.routing';
import { AuthGuard } from '../_guards/auth.guard';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './add-address-book/add-address-book.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/navbar.component'
import { AddressBookService } from '../_services/address-book.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
@NgModule({
    declarations: [
        HeaderComponent,
        IndexInnerComponent,
        AddressListComponent,
        AddAddressComponent
    ],
    imports: [
        CommonModule,
        InnerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'primary' // set defaults here
        }),
        NgxPaginationModule
    ],
    providers: [AuthGuard, AddressBookService],
    bootstrap: [IndexInnerComponent]
})
export class InnerModule { }
