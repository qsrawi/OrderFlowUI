import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateItemDto } from '../../models/items';
import * as ItemActions from '../../store/actions/items.actions';
import { Observable, take } from 'rxjs';
import { selectUserId } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddItemComponent {
  itemForm: FormGroup;
  userId$: Observable<number| undefined>;

  supplierId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      images: [''],
      supplierId: [1]
    });
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const item: CreateItemDto = this.itemForm.value;
      this.userId$.subscribe(id => this.supplierId = id);
      const updatedItem: CreateItemDto = {
        ...item,
        supplierId: this.supplierId
      };
      this.store.dispatch(ItemActions.addItem({ item: updatedItem }));
      this.router.navigate(['supplier/items']);
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
}
