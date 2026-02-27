import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { MATERIAL_MODULES } from 'src/app/shared/material.module';
import { AddressBookService } from '../../address-book.service';
import { AddressBook } from 'src/app/core/models/address-book.model';


@Component({
    selector: 'app-add-edit-address-book',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ...MATERIAL_MODULES
    ],
    standalone: true,
    templateUrl: './add-edit-address-book.component.html',
    styleUrls: ['./add-edit-address-book.component.scss']
})
export class AddEditAddressBookComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private service = inject(AddressBookService);
  private titleService = inject(Title);

  isEditMode = signal(false);
  isLoading = signal(false);
  currentId = signal<number | null>(null);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailId: ['', [Validators.required, Validators.email]],
    contactNo: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$') // 10 digit validation
    ]],
    isActive: [true]
  });



  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data = this.service.getSelectedAddress();

    if (data && data.address_id === id) {
      const nameParts = data.name?.split(' ') ?? [];
      this.form.patchValue({
        firstName: nameParts[0] ?? '',
        lastName: nameParts.slice(1).join(' ') ?? '',
        emailId: data.email,
        contactNo: data.contact_number,
        isActive: data.is_active === "1"
      });
      this.isEditMode.set(true);
      this.currentId.set(Number(data.address_id));
      this.titleService.setTitle('Update Address');
    } else {
      this.titleService.setTitle('Add New Address');
    }
  }



  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const payload: AddressBook = {
      address_id: this.currentId() ?? undefined,
      user_id: user?.user_id,
      name: this.form.value.firstName! + ' ' + this.form.value.lastName!,
      email: this.form.value.emailId!,
      contact_number: this.form.value.contactNo!,
      is_active: this.form.value.isActive!
    };

    this.isLoading.set(true);
    const request$ = payload.address_id && payload.address_id > 0
      ? this.service.update(payload)
      : this.service.add(payload);

    request$.subscribe({
      next: (response: any) => {

        if (response.res) {

          this.snackBar.open(response.msg, 'Close', {
            duration: 3000
          });

          this.router.navigate(['/address-book']);

        } else {
          this.snackBar.open(response.msg, 'Close', {
            duration: 3000
          });
        }
      },
      error: () => {
        this.snackBar.open('Something went wrong', 'Close', {
          duration: 3000
        });
      },
      complete: () => this.isLoading.set(false)
    });
  }


  cancel(): void {
    this.router.navigate(['/address-book']);
  }
}
