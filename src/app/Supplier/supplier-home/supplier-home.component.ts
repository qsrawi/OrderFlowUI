import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-supplier-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './supplier-home.component.html',
  styleUrl: './supplier-home.component.css'
})

export class SupplierHomeComponent {
  constructor(private store: Store){}

  onMyItemsClick() {
    this.store.dispatch(AuthActions.allItems({ isAllItems: false }));
  }

  onAllItemsClick() {
    this.store.dispatch(AuthActions.allItems({ isAllItems: true }));
  }
}
