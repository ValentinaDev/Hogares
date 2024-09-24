import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VivetufeComponent } from './vivetufe.component';

describe('VivetufeComponent', () => {
  let component: VivetufeComponent;
  let fixture: ComponentFixture<VivetufeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VivetufeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VivetufeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
