import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsManagmentComponent } from './comments-managment.component';

describe('CommentsManagmentComponent', () => {
  let component: CommentsManagmentComponent;
  let fixture: ComponentFixture<CommentsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
