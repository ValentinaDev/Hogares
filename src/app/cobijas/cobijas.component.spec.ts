import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobijasComponent } from './cobijas.component';

describe('CobijasComponent', () => {
  let component: CobijasComponent;
  let fixture: ComponentFixture<CobijasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobijasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobijasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
