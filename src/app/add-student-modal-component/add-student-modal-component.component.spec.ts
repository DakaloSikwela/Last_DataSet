import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentModalComponent } from './add-student-modal-component.component';

describe('AddStudentModalComponentComponent', () => {
  let component: AddStudentModalComponent;
  let fixture: ComponentFixture<AddStudentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudentModalComponent]
    });
    fixture = TestBed.createComponent(AddStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
