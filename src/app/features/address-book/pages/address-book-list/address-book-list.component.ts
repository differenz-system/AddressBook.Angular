import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MATERIAL_MODULES } from 'src/app/shared/material.module';
import { AddressBook } from 'src/app/core/models/address-book.model';
import { AddressBookService } from '../../address-book.service';



@Component({
  selector: 'app-address-book-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  templateUrl: './address-book-list.component.html',
  styleUrls: ['./address-book-list.component.scss']
})
export class AddressBookListComponent implements OnInit {

  isLoading = signal(false);

  displayedColumns: string[] = [
    'name',
    'email',
    'contact_number',
    'is_active',
    'actions'
  ];

  dataSource = new MatTableDataSource<AddressBook>([]);
  searchControl = new FormControl('');

  constructor(
    private addressService: AddressBookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();

    this.searchControl.valueChanges.subscribe(value => {
      this.dataSource.filter = value?.trim().toLowerCase() || '';
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    var userId = Number(localStorage.getItem('token'));
    this.addressService.getAll(userId).subscribe({
      next: (response: any) => {
        if (response.res == 0) {
          this.dataSource.data = response.data;
        }
      },
      error: () => {
        this.snackBar.open('Failed to load address list', 'Close', {
          duration: 3000
        });
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  addNew(): void {
    this.router.navigate(['/address-book/add']);
  }

  edit(data: any): void {
    this.addressService.setSelectedAddress(data);
    this.router.navigate(['/address-book/edit', data.address_id]);
  }

  delete(data: any): void {
    this.addressService.delete(data.user_id, data.address_id).subscribe({
      next: (res: any) => {
        if (res.res == 0) {
          this.snackBar.open(res.msg, 'Close', { duration: 3000 });
          this.loadData();
        }
      }
    });
  }
}
