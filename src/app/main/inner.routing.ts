import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexInnerComponent } from './index.component';
import { AuthGuard } from '../_guards/auth.guard';
import { AddressListComponent } from './address-list/address-list.component'
import { AddAddressComponent } from './add-address-book/add-address-book.component'
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: IndexInnerComponent, canActivate: [AuthGuard],
                children: [
                    { path: 'address-book', component: AddressListComponent, canActivate: [AuthGuard] },
                    { path: 'add', component: AddAddressComponent, canActivate: [AuthGuard] },
                    { path: 'add/:id', component: AddAddressComponent, canActivate: [AuthGuard] },
                ]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class InnerRoutingModule { }