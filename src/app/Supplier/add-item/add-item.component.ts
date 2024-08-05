import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as ItemActions from '../../store/actions/items.actions';
import { ItemFormComponent } from '../item-form/item-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  template:`
    <app-item-form
      [isUpdateMode]="false"
      (formSubmit)="onFormSubmit($event)">
    </app-item-form>
  `,
  standalone: true,
  imports: [CommonModule, ItemFormComponent]
})
export class AddItemComponent {
  constructor(private store: Store, private router: Router) {}

  onFormSubmit(event: { id: number | null, formData: FormData }): void {
    this.store.dispatch(ItemActions.saveItem({ item: event.formData }));
    this.router.navigate(['supplier/items']);
  }
}