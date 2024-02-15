import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsetupComponent } from './studentsetup.component';

describe('StudentsetupComponent', () => {
  let component: StudentsetupComponent;
  let fixture: ComponentFixture<StudentsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
