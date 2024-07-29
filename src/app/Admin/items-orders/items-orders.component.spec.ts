import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsOrdersComponent } from './items-orders.component';

describe('ItemsOrdersComponent', () => {
  let component: ItemsOrdersComponent;
  let fixture: ComponentFixture<ItemsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
