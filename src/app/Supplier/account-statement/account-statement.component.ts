import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/cheque_transaction';
import { selectTransactions } from '../../store/selectors/transactions.selectors';
import { loadTransactions } from '../../store/actions/cheques.actions';
import { selectError, selectLoading } from '../../store/selectors/suppliers.selectors';
import { selectUserId } from '../../store/selectors/auth.selectors';

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

  supplierId: number | undefined;

  constructor(private store: Store) {
    this.transactions$ = this.store.select(selectTransactions);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.userId$.subscribe(id => this.supplierId = id);

    this.store.dispatch(loadTransactions({ supplierId: this.supplierId }));
  }
}
