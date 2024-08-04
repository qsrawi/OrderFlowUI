import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SupplierHomeComponent } from './Supplier/supplier-home/supplier-home.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { CustomerHomeComponent } from './Customer/customer-home/customer-home.component';
import { AuthGuard } from './auth.guard';
import { SuppliersViewComponent } from './Admin/suppliers-view/suppliers-view.component';
import { ChequesComponent } from './generic/cheques/cheques.component';
import { AddSupplierComponent } from './Admin/add-supplier/add-supplier.component';
import { ItemsComponent } from './generic/items/items.component';
import { OrderComponent } from './Admin/orders/orders.component';
import { UpdateSupplierComponent } from './Admin/update-supplier/update-supplier.component';
import { EndorsementChequeComponent } from './Supplier/endorsement-cheque/endorsement-cheque.component';
import { AddReceiptComponent } from './Supplier/add-receipt/add-receipt.component';
import { CustomersViewComponent } from './generic/customers-view/customers-view.component';
import { AddCustomerComponent } from './Supplier/add-customer/add-customer.component';
import { AddItemComponent } from './Supplier/add-item/add-item.component';
import { AccountStatementComponent } from './Supplier/account-statement/account-statement.component';
import { CartComponent } from './generic/cart/cart.component';
import { ReceiptComponent } from './Customer/receipt/receipt.component';
import { LogoutComponent } from './generic/logout/logout.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'supplier', component: SupplierHomeComponent, canActivate: [AuthGuard], data: { role: 'Supplier' },
    children: [
      { path: 'items', component: ItemsComponent },
      { path: 'add-item', component: AddItemComponent },
      { path: 'customers-view', component: CustomersViewComponent },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: 'add-receipt', component: AddReceiptComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'cheques', component: ChequesComponent },
      { path: 'suppliers-view', component: SuppliersViewComponent },
      { path: 'account-statement', component: AccountStatementComponent },
      { path: 'cart', component: CartComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },
  { path: 'customer', component: CustomerHomeComponent, canActivate: [AuthGuard], data: { role: 'Customer' },
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'receipt', component: ReceiptComponent },
      { path: 'account-statement', component: AccountStatementComponent },
    ]
  },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'Admin' },
    children: [
      { path: 'add-supplier', component: AddSupplierComponent },
      { path: 'suppliers-view', component: SuppliersViewComponent },
      { path: 'cheques', component: ChequesComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'add-supplier', component: AddSupplierComponent },
      { path: 'update-supplier/:id', component: UpdateSupplierComponent },
    ]
  },
  { path: 'customer', component: CustomerHomeComponent, canActivate: [AuthGuard], data: { role: 'Customer' } }
]
