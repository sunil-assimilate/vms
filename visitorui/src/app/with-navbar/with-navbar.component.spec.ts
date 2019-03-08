import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithNavbarComponent } from './with-navbar.component';

describe('WithNavbarComponent', () => {
  let component: WithNavbarComponent;
  let fixture: ComponentFixture<WithNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
