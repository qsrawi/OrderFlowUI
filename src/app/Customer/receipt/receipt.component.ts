import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ReceiptDto, ReceiptState } from '../../models/receipts';
import { loadReceipts } from '../../store/actions/receipt.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectUserId } from '../../store/selectors/auth.selectors';
import { selectReceiptResponse } from '../../store/selectors/receipt.selectors';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReceiptComponent implements OnInit {
  receipts$: Observable<ReceiptDto[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  userId$: Observable<number| undefined>;


  constructor(private store: Store<{ receiptState: ReceiptState }>) {
    this.receipts$ = this.store.select(selectReceiptResponse);
    this.loading$ = this.store.pipe(select(state => state.receiptState.loading));
    this.error$ = this.store.pipe(select(state => state.receiptState.error));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
   this.userId$.subscribe(customerId =>
    this.store.dispatch(loadReceipts({ customerId }))
   )
  }

  getTotalAmount(receipt: ReceiptDto): number {
    const chequeTotal = (receipt.cheques || []).reduce((sum, cheque) => sum + cheque.amount, 0);
    const cashTotal = (receipt.cashDetailes || []).reduce((sum, cash) => sum + cash.amount, 0);
    return chequeTotal + cashTotal;
  }
}