import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaurdNavbarComponent } from './gaurd-navbar.component';

describe('GaurdNavbarComponent', () => {
  let component: GaurdNavbarComponent;
  let fixture: ComponentFixture<GaurdNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaurdNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaurdNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
