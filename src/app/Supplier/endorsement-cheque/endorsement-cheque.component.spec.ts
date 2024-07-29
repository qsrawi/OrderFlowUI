import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorsementChequeComponent } from './endorsement-cheque.component';

describe('EndorsementChequeComponent', () => {
  let component: EndorsementChequeComponent;
  let fixture: ComponentFixture<EndorsementChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndorsementChequeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndorsementChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
