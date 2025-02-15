import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SuppliersActions from '../store/actions/suppliers.actions';
import { selectAllSuppliers, selectTotalCount, selectPageNumber, selectPageSize, selectFilters, selectLoading, selectError, selectSupplier } from '../store/selectors/suppliers.selectors';
import { CreateSupplierDto, Supplier } from '../models/supplier';
import { SuppliersState } from '../store/reducers/suppliers.reducer';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  constructor(private store: Store<{ suppliers: SuppliersState }>) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.store.select(selectAllSuppliers);
  }

  getTotalCount(): Observable<number> {
    return this.store.select(selectTotalCount);
  }

  getPageNumber(): Observable<number> {
    return this.store.select(selectPageNumber);
  }

  getPageSize(): Observable<number> {
    return this.store.select(selectPageSize);
  }

  getFilters(): Observable<any> {
    return this.store.select(selectFilters);
  }

  getLoading(): Observable<boolean> {
    return this.store.select(selectLoading);
  }

  getError(): Observable<string | null> {
    return this.store.select(selectError);
  }

  loadSuppliers(pageNumber: number, pageSize: number, filters: any, supplierId: number | undefined): void {
    this.store.dispatch(SuppliersActions.loadSuppliers({ pageNumber, pageSize, filters, supplierId}));
  }

  loadSupplier(id: number): Observable<CreateSupplierDto | null> {
    this.store.dispatch(SuppliersActions.loadSupplier({ id }));
    return this.store.select(selectSupplier);
  }

  saveSupplierWithDispatch(id: number | undefined, supplier: CreateSupplierDto): void {
    this.store.dispatch(SuppliersActions.saveSupplier({ id, supplier }));
  }

  deleteSupplier(id: number): void {
    this.store.dispatch(SuppliersActions.deleteSupplier({ id }));
  }
}
