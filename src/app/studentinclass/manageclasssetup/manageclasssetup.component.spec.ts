import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageclasssetupComponent } from './manageclasssetup.component';

describe('ManageclasssetupComponent', () => {
  let component: ManageclasssetupComponent;
  let fixture: ComponentFixture<ManageclasssetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageclasssetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageclasssetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
