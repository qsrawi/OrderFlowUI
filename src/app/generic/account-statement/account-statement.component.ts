import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/cheque_transaction';
import { selectTransactions } from '../../store/selectors/transactions.selectors';
import { loadTransactions } from '../../store/actions/cheques.actions';
import * as CustomerActions  from '../../store/actions/customer.actions';
import { selectError, selectLoading } from '../../store/selectors/suppliers.selectors';
import { selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AccountStatementComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userId$: Observable<number| undefined>;
  userRole$: Observable<string | undefined>;

  userId: number | undefined;
  userRole: string | undefined;

  constructor(private store: Store) {
    this.transactions$ = this.store.select(selectTransactions);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
  }

  ngOnInit(): void {
    this.userId$.subscribe(id => this.userId = id);
    this.userRole$.subscribe(userRole => this.userRole = userRole);

    if(this.userRole == "Supplier")
      this.store.dispatch(loadTransactions({ supplierId: this.userId }));
    else
      this.store.dispatch(CustomerActions.loadTransactions({ customerId: this.userId , role: "Customer"}));
  }

  getFirstRemainingDebt(transactions: Transaction[]): number {
    return transactions.length > 0 ? transactions[0].remainingDebt : 0;
  }

  getDebtStatusColor(debt: number): string {
    return debt < 0 ? 'text-success' : 'text-danger';
  }

  getDebtLabel(debt: number): string {
    return debt < 0 ? 'Credit' : 'Debt';
  }

  getFormattedDebt(debt: number): string {
    return Math.abs(debt).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

}
