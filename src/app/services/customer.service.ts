import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CustomerActions from '../store/actions/customer.actions';
import { CustomerState } from '../store/reducers/customer.reducer';
import { Observable } from 'rxjs';
import { CustomerBaseDto } from '../models/customer';
import { selectAllCustomers, selectCustomer, selectFilters, selectPageNumber, selectPageSize, selectTotalCount } from '../store/selectors/customer.selectors';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private store: Store<{ suppliers: CustomerState }>) {}


  loadCustomer(id: number ): Observable<CustomerBaseDto | null> {
    this.store.dispatch(CustomerActions.loadCustomer({ id }));
    return this.store.select(selectCustomer);
  }

  loadCustomers(id: number | undefined, pageNumber: number, pageSize: number, filters: any): void {
    this.store.dispatch(CustomerActions.loadCustomers({id, pageNumber, pageSize, filters }));
  }

  saveCustomerWithDispatch(id: number | undefined, customer: CustomerBaseDto): void {
    this.store.dispatch(CustomerActions.saveCustomer({ id, customer }));
  }
  
  getCustomers(): Observable<CustomerBaseDto[]> {
    return this.store.select(selectAllCustomers);
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
}
