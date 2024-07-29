import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChequesComponent } from './search-cheques.component';

describe('SearchChequesComponent', () => {
  let component: SearchChequesComponent;
  let fixture: ComponentFixture<SearchChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchChequesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
