import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Supplier } from '../../models/supplier';
import { SuppliersService } from '../../services/suppliers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';
import { selectchequesToEndorsement } from '../../store/selectors/cheques.selectors';
import * as ChequesActions from '../../store/actions/cheques.actions';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-suppliers-view',
  templateUrl: './suppliers-view.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class SuppliersViewComponent implements OnInit {
  suppliers$: Observable<Supplier[]>;
  totalCount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userRole$: Observable<string| undefined>;
  userId$: Observable<number| undefined>;
  chequesToEndorsement$: Observable<number[]>;

  filters: any = {
    name: '',
    userName: '',
    email: '',
    phone: '',
    address: '',
    identity: ''
  };

  pageNumber: number = 1;
  pageSize: number = 10;
  userRole: string | undefined;
  userId: number | undefined;

  constructor(private suppliersService: SuppliersService, private router: Router, private store: Store, private toastr: ToastrService) {
    this.suppliers$ = this.suppliersService.getSuppliers();
    this.totalCount$ = this.suppliersService.getTotalCount();
    this.loading$ = this.suppliersService.getLoading();
    this.error$ = this.suppliersService.getError();
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
    this.chequesToEndorsement$ = this.store.select(selectchequesToEndorsement).pipe(take(1));
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => this.userRole = role);
    this.userId$.subscribe(userId => this.userId = userId);
    this.loadSuppliers();
  }
  
  loadSuppliers(): void {
    if (this.userRole === 'Supplier') {
      this.suppliersService.loadSuppliers(this.pageNumber, this.pageSize, this.filters, this.userId);
    } else
    this.suppliersService.loadSuppliers(this.pageNumber, this.pageSize, this.filters, undefined);
  }

  applyFilters(): void {
    this.pageNumber = 1;
    this.loadSuppliers();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadSuppliers();
  }

  onPageSizeChange(event: Event): void {
    const newSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newSize, 10);
    this.filters = { ...this.filters, PageSize: this.pageSize, PageNumber: 1 };
    this.loadSuppliers();
  }

  updateFilter(field: string, value: string): void {
    this.filters = { ...this.filters, [field]: value };
  }

  editSupplier(supplierId: number): void {
    this.router.navigate(['admin/update-supplier', supplierId]);
  }

  deleteSupplier(supplierId: number): void {
    this.suppliersService.deleteSupplier(supplierId)
  }

  createEndorsementCheque(supplierId: number): void {
    this.chequesToEndorsement$.subscribe(chequesToEndorsement => {
      if (chequesToEndorsement.length === 0) {
        alert('You have to go to the cheques field to select cheques for endorsement.');
        return;
      }
    
      this.store.dispatch(ChequesActions.endorsementCheque({ chequesIds: chequesToEndorsement, supplierId }));
      this.store.dispatch(ChequesActions.clearChequesToEndorsement());
    });
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.pageSize))
    );
  }
}