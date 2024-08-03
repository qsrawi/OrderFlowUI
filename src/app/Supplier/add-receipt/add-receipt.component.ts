import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Receipt, ReceiptState } from '../../models/receipts';
import * as ReceiptActions from '../../store/actions/receipt.actions';
import { selectforCustomer, selectforSupplier, selectUserId } from '../../store/selectors/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css'],
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  totalAmount: number = 0;
  totalAmount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  forCustomer$: Observable<number | undefined>;
  forSupplier$: Observable<number | undefined>;
  userId$: Observable<number| undefined>;

  customerId: number | undefined = 0;
  TradingSupplierId: number | undefined = 0;
  userId: number | undefined = 0;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private store: Store<{ receipt: ReceiptState }>, private router: Router) {
    this.receiptForm = this.fb.group({
      cheques: this.fb.array([]),
      cashDetails: this.fb.array([])
    });

    this.totalAmount$ = this.store.select(state => state.receipt.totalAmount);
    this.loading$ = this.store.select(state => state.receipt.loading);
    this.error$ = this.store.select(state => state.receipt.error);
    this.forCustomer$ = this.store.select(selectforCustomer).pipe(take(1));
    this.forSupplier$ = this.store.select(selectforSupplier).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.receiptForm.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
    this.forCustomer$.subscribe(id => this.customerId = id);
    this.forSupplier$.subscribe(id => this.TradingSupplierId = id);
    this.userId$.subscribe(id => this.userId = id);
  }

  get cheques(): FormArray {
    return this.receiptForm.get('cheques') as FormArray;
  }

  get cashDetails(): FormArray {
    return this.receiptForm.get('cashDetails') as FormArray;
  }

  addCheque() {
    const chequeGroup = this.fb.group({
      chequeNumber: [null, Validators.required],
      issueDate: [null, Validators.required],
      dueDate: [null, Validators.required],
      amount: [0, Validators.required],
      accountNumber: ['', Validators.required],
      currency: ['USD', Validators.required],
      bankName: ['Ibn Sina', Validators.required],
      issuerSupplierId: [0],
      receiverSupplierId: [0],
      customerId: [0],
      frontImage: [null, Validators.required],
      backImage: [null, Validators.required]  
    });
    this.cheques.push(chequeGroup);
  }

  removeCheque(index: number) {
    this.cheques.removeAt(index);
    this.calculateTotals();
  }

  addCashDetail() {
    const cashGroup = this.fb.group({
      number: [null, Validators.required],
      amount: [0, Validators.required],
      currency: ['USD', Validators.required],
      date: [null, Validators.required],
      supplierId: [0],
      customerId: [0],
      tradingSupplierId: [0],
    });
    this.cashDetails.push(cashGroup);
  }

  removeCashDetail(index: number) {
    this.cashDetails.removeAt(index);
    this.calculateTotals();
  }

  calculateTotals() {
    const chequesTotal = this.cheques.controls.reduce((sum, cheque) => {
      return sum + (cheque.get('amount')?.value || 0);
    }, 0);

    const cashTotal = this.cashDetails.controls.reduce((sum, cash) => {
      return sum + (cash.get('amount')?.value || 0);
    }, 0);

    this.totalAmount = chequesTotal + cashTotal;
  }

  onFileChange(event: any, index: number, type: 'frontImage' | 'backImage') {
    const file = event.target.files[0];
    if (file) {
      this.cheques.at(index).patchValue({ [type]: file });
      this.cheques.at(index).get(type)?.updateValueAndValidity();
    }
  }

  submit() {
    const formData = new FormData();

    this.cheques.controls.forEach((cheque, index) => {
      const chequeData = cheque.value;
      formData.append(`cheques[${index}].chequeNumber`, chequeData.chequeNumber);
      formData.append(`cheques[${index}].issueDate`, chequeData.issueDate);
      formData.append(`cheques[${index}].dueDate`, chequeData.dueDate);
      formData.append(`cheques[${index}].amount`, chequeData.amount);
      formData.append(`cheques[${index}].accountNumber`, chequeData.accountNumber);
      formData.append(`cheques[${index}].currency`, chequeData.currency);
      formData.append(`cheques[${index}].issuerSupplierId`, chequeData.issuerSupplierId);
      formData.append(`cheques[${index}].receiverSupplierId`, chequeData.receiverSupplierId);
      formData.append(`cheques[${index}].customerId`, chequeData.customerId);
      formData.append(`cheques[${index}].bankName`, chequeData.bankName);
      formData.append(`cheques[${index}].status`, chequeData.status);

      if (chequeData.frontImage) {
        formData.append(`cheques[${index}].FrontImage`, chequeData.frontImage, chequeData.frontImage.name);
      }
      if (chequeData.backImage) {
        formData.append(`cheques[${index}].BackImage`, chequeData.backImage, chequeData.backImage.name);
      }
    });

    this.cashDetails.controls.forEach((cash, index) => {
      const cashData = cash.value;
      formData.append(`cashDetails[${index}].number`, cashData.number);
      formData.append(`cashDetails[${index}].amount`, cashData.amount);
      formData.append(`cashDetails[${index}].currency`, cashData.currency);
      formData.append(`cashDetails[${index}].date`, cashData.date);
      formData.append(`cashDetails[${index}].supplierId`, cashData.supplierId);
      formData.append(`cashDetails[${index}].customerId`, cashData.customerId);
      formData.append(`cashDetails[${index}].customerName`, cashData.customerName);
    });

    if (this.userId !== 0 && this.userId !== undefined) {
      formData.append('supplierId', this.userId.toString());

    if (this.customerId !== 0 && this.customerId !== undefined) {
        formData.append('customerId', this.customerId.toString());
    }

    if (this.TradingSupplierId !== 0 && this.TradingSupplierId !== undefined) {
        formData.append('tradingSupplierId', this.TradingSupplierId.toString());
    }

    formData.append('isReceipt', 'true');

    this.store.dispatch(ReceiptActions.addReceipt({ receipt: formData }));
    this.router.navigate(['/supplier/cheques']);
  }
}
}


// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { Observable } from 'rxjs';
// import { CashDto } from '../../models/cash';
// import * as CashActions from '../../store/actions/cash.actions';
// import * as ReceiptActions from '../../store/actions/receipt.actions';
// import { selectAllCashDetails, selectCashLoading, selectCashError } from '../../store/selectors/cash.selectors';
// import { selectReceiptResponse } from '../../store/selectors/receipt.selectors';
// import { CreateReceiptDto, ReceiptDto } from '../../models/receipts';

// @Component({
//   selector: 'app-add-receipt',
//   templateUrl: './add-receipt.component.html',
//   styleUrls: ['./add-receipt.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule]
// })
// export class AddReceiptComponent implements OnInit {
//   selectedTab: string = 'Cash';
//   selectedSubTab: string = 'CashReceipt';
//   selectedCashDetail: CashDto | null = null;
//   cashDetails$: Observable<CashDto[]> = this.store.select(selectAllCashDetails);
//   loading$: Observable<boolean> = this.store.select(selectCashLoading);
//   error$: Observable<any> = this.store.select(selectCashError);
//   receiptResponse$: Observable<ReceiptDto | null> = this.store.select(selectReceiptResponse);

//   constructor(private store: Store) {}

//   ngOnInit(): void {
//     if (this.selectedTab === 'Cash') {
//       this.store.dispatch(CashActions.loadCashDetails({ supplierId: 4 }));
//     }
//   }

//   selectTab(tab: string): void {
//     this.selectedTab = tab;
//     this.selectedSubTab = tab === 'Cash' ? 'CashReceipt' : 'ChequeReceipt';
//     if (tab === 'Cash') {
//       this.store.dispatch(CashActions.loadCashDetails({ supplierId: 4 }));
//     }
//   }

//   selectSubTab(subTab: string): void {
//     this.selectedSubTab = subTab;
//   }

//   onCashDetailSelect(cashDetail: CashDto): void {
//     this.selectedCashDetail = cashDetail;
//   }

//   onSubmit(): void {
//     if (this.selectedCashDetail) {
//       const receipt: CreateReceiptDto = {
//         cashId : this.selectedCashDetail.id,
//         supplierId: this.selectedCashDetail.supplierId,
//         customerId: this.selectedCashDetail.customerId
//       };

//       this.store.dispatch(ReceiptActions.addReceipt({ receipt }));
//     }
//   }
