import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactManagmentComponent } from './contact-managment.component';

describe('ContactManagmentComponent', () => {
  let component: ContactManagmentComponent;
  let fixture: ComponentFixture<ContactManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
