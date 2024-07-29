import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiptComponent } from './add-receipt.component';

describe('AddReceiptComponent', () => {
  let component: AddReceiptComponent;
  let fixture: ComponentFixture<AddReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
