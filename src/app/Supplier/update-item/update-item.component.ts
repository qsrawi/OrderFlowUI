import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemFormComponent } from '../item-form/item-form.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as ItemActions from '../../store/actions/items.actions';

@Component({
  selector: 'app-update-item',
  template: `
    <app-item-form
      [isUpdateMode]="true"
      [itemId]="itemId"
      (formSubmit)="onFormSubmit($event)">
    </app-item-form>
  `,
  standalone: true,
  imports: [CommonModule, ItemFormComponent]
})
export class UpdateItemComponent implements OnInit {
  itemId: number | null = null;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit(): void {
    const itemIdParam = this.route.snapshot.paramMap.get('id');
    if (itemIdParam) {
      this.itemId = Number(itemIdParam);
    }
  }

  onFormSubmit(event: { id: number | null, formData: FormData }): void {
    if (event.id !== null) {
      this.store.dispatch(ItemActions.saveItem({ id: event.id, item: event.formData }));
      this.router.navigate(['supplier/items']);
    }
  }
}
