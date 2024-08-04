import { Component, OnInit } from '@angular/core';
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
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  userId$: Observable<number | undefined>;

  supplierId: number | undefined;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      image: [null, Validators.required],
      supplierId: [2]
    });
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.userId$.subscribe(role => this.supplierId = role);
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formData = new FormData();
      formData.append('name', this.itemForm.get('name')?.value);
      formData.append('price', this.itemForm.get('price')?.value);
      if (this.itemForm.get('description')?.value) {
        formData.append('description', this.itemForm.get('description')?.value);
      }

      if (this.selectedFile) {
        formData.append('image', this.selectedFile as File);
      }

      if (this.supplierId) {
        formData.append('supplierId', this.supplierId.toString());
      }

      this.store.dispatch(ItemActions.addItem({ item: formData }));
      this.router.navigate(['supplier/items']);

    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.itemForm.patchValue({
        image: file
      });
      this.itemForm.get('image')?.updateValueAndValidity();
    }
  }
}
