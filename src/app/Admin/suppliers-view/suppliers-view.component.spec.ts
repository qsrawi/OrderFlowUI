import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersViewComponent } from './suppliers-view.component';

describe('SuppliersViewComponent', () => {
  let component: SuppliersViewComponent;
  let fixture: ComponentFixture<SuppliersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
