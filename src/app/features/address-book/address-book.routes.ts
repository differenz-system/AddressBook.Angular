import { Routes } from '@angular/router';

export const ADDRESS_BOOK_ROUTES: Routes = [

  // /address-book
  {
    path: '',
    loadComponent: () =>
      import('./pages/address-book-list/address-book-list.component')
        .then(m => m.AddressBookListComponent)
  },

  // /address-book/add
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-edit-address-book/add-edit-address-book.component')
        .then(m => m.AddEditAddressBookComponent)
  },

  // /address-book/edit/1
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/add-edit-address-book/add-edit-address-book.component')
        .then(m => m.AddEditAddressBookComponent)
  }

];
