import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapsContainerComponent } from './taps-container.component';

describe('TapsContainerComponent', () => {
  let component: TapsContainerComponent;
  let fixture: ComponentFixture<TapsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TapsContainerComponent]
    });
    fixture = TestBed.createComponent(TapsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
