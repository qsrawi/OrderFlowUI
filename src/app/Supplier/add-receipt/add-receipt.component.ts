import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CashDto } from '../../models/cash';
import * as CashActions from '../../store/actions/cash.actions';
import * as ReceiptActions from '../../store/actions/receipt.actions';
import { selectAllCashDetails, selectCashLoading, selectCashError } from '../../store/selectors/cash.selectors';
import { selectReceiptResponse } from '../../store/selectors/receipt.selectors';
import { CreateReceiptDto, ReceiptDto } from '../../models/receipts';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AddReceiptComponent implements OnInit {
  selectedTab: string = 'Cash';
  selectedSubTab: string = 'CashReceipt';
  selectedCashDetail: CashDto | null = null;
  cashDetails$: Observable<CashDto[]> = this.store.select(selectAllCashDetails);
  loading$: Observable<boolean> = this.store.select(selectCashLoading);
  error$: Observable<any> = this.store.select(selectCashError);
  receiptResponse$: Observable<ReceiptDto | null> = this.store.select(selectReceiptResponse);

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.selectedTab === 'Cash') {
      this.store.dispatch(CashActions.loadCashDetails({ supplierId: 4 }));
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.selectedSubTab = tab === 'Cash' ? 'CashReceipt' : 'ChequeReceipt';
    if (tab === 'Cash') {
      this.store.dispatch(CashActions.loadCashDetails({ supplierId: 4 }));
    }
  }

  selectSubTab(subTab: string): void {
    this.selectedSubTab = subTab;
  }

  onCashDetailSelect(cashDetail: CashDto): void {
    this.selectedCashDetail = cashDetail;
  }

  onSubmit(): void {
    if (this.selectedCashDetail) {
      const receipt: CreateReceiptDto = {
        cashId : this.selectedCashDetail.id,
        supplierId: this.selectedCashDetail.supplierId,
        customerId: this.selectedCashDetail.customerId
      };

      this.store.dispatch(ReceiptActions.addReceipt({ receipt }));
    }
  }
}
