import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersViewComponent } from './customers-view.component';

describe('CustomersViewComponent', () => {
  let component: CustomersViewComponent;
  let fixture: ComponentFixture<CustomersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
