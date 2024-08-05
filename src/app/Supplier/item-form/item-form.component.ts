import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as ItemActions from '../../store/actions/items.actions';
import { Observable, take } from 'rxjs';
import { selectUserId } from '../../store/selectors/auth.selectors';
import { selectItemById } from '../../store/selectors/items.selectors';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ItemFormComponent implements OnInit {
  @Input() isUpdateMode: boolean = false;
  @Input() itemId: number | null = null;
  @Output() formSubmit = new EventEmitter<{ id: number | null, formData: FormData }>();

  itemForm: FormGroup;
  userId$: Observable<number | undefined>;
  supplierId: number | undefined;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      images: [null],
      supplierId: [2]
    });
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.userId$.subscribe(id => this.supplierId = id);

    if (this.isUpdateMode && this.itemId) {
      this.loadItemDetails(this.itemId);
    }
  }

  loadItemDetails(itemId: number): void {
    this.store.select(selectItemById(itemId)).subscribe(item => {
      if (item) {
        this.itemForm.patchValue({
          name: item.name,
          price: item.price,
          description: item.description,
          supplierId: item.supplierId
        });
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.itemForm.valid) {
      const formData = this.createFormData();
      this.formSubmit.emit({ id: this.isUpdateMode ? this.itemId : null, formData });
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  createFormData(): FormData {
    const formData = new FormData();
    formData.append('name', this.itemForm.get('name')?.value);
    formData.append('price', this.itemForm.get('price')?.value);
    if (this.itemForm.get('description')?.value) {
      formData.append('description', this.itemForm.get('description')?.value);
    }

    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    })
    if (this.supplierId) {
      formData.append('supplierId', this.supplierId.toString());
    }
    return formData;
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => this.selectedFiles.push(file as File));
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['/supplier/items']);
  }
}