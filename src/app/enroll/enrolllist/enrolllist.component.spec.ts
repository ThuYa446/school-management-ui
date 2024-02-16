import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolllistComponent } from './enrolllist.component';

describe('EnrolllistComponent', () => {
  let component: EnrolllistComponent;
  let fixture: ComponentFixture<EnrolllistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolllistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
