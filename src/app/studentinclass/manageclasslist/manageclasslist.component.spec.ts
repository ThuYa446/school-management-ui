import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageclasslistComponent } from './manageclasslist.component';

describe('ManageclasslistComponent', () => {
  let component: ManageclasslistComponent;
  let fixture: ComponentFixture<ManageclasslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageclasslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageclasslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
