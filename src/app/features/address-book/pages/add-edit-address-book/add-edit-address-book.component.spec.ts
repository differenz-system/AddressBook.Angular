import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAddressBookComponent } from './add-edit-address-book.component';

describe('AddEditAddressBookComponent', () => {
  let component: AddEditAddressBookComponent;
  let fixture: ComponentFixture<AddEditAddressBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditAddressBookComponent]
    });
    fixture = TestBed.createComponent(AddEditAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
