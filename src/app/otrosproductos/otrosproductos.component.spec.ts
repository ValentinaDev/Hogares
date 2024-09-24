import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosproductosComponent } from './otrosproductos.component';

describe('OtrosproductosComponent', () => {
  let component: OtrosproductosComponent;
  let fixture: ComponentFixture<OtrosproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrosproductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtrosproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
