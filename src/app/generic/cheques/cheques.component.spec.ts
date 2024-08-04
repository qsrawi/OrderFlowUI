import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesComponent } from './cheques.component';

describe('ChequesComponent', () => {
  let component: ChequesComponent;
  let fixture: ComponentFixture<ChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChequesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
