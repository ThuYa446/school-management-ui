import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsetupComponent } from './subjectsetup.component';

describe('SubjectsetupComponent', () => {
  let component: SubjectsetupComponent;
  let fixture: ComponentFixture<SubjectsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
