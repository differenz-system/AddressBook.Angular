import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookListComponent } from './address-book-list.component';

describe('AddressBookListComponent', () => {
  let component: AddressBookListComponent;
  let fixture: ComponentFixture<AddressBookListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddressBookListComponent]
    });
    fixture = TestBed.createComponent(AddressBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
