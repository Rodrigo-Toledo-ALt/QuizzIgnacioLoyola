import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RedirigirComponent } from './redirigir.component';

describe('RedirigirComponent', () => {
  let component: RedirigirComponent;
  let fixture: ComponentFixture<RedirigirComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RedirigirComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RedirigirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
