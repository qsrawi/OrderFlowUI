import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderssComponent } from './orderss.component';

describe('OrderssComponent', () => {
  let component: OrderssComponent;
  let fixture: ComponentFixture<OrderssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
