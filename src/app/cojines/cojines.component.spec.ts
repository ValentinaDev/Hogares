import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CojinesComponent } from './cojines.component';

describe('CojinesComponent', () => {
  let component: CojinesComponent;
  let fixture: ComponentFixture<CojinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CojinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CojinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
