import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SupplierHomeComponent } from './Supplier/supplier-home/supplier-home.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { CustomerHomeComponent } from './Customer/customer-home/customer-home.component';
import { AuthGuard } from './auth.guard';
import { SuppliersViewComponent } from './generic/suppliers-view/suppliers-view.component';
import { ChequesComponent } from './generic/cheques/cheques.component';
import { AddSupplierComponent } from './Admin/add-supplier/add-supplier.component';
import { ItemsComponent } from './generic/items/items.component';
import { OrderComponent } from './generic/orders/orders.component';
import { UpdateSupplierComponent } from './Admin/update-supplier/update-supplier.component';
import { AddReceiptComponent } from './Supplier/add-receipt/add-receipt.component';
import { CustomersViewComponent } from './generic/customers-view/customers-view.component';
import { AddCustomerComponent } from './Supplier/add-customer/add-customer.component';
import { AddItemComponent } from './Supplier/add-item/add-item.component';
import { CartComponent } from './generic/cart/cart.component';
import { ReceiptComponent } from './Customer/receipt/receipt.component';
import { LogoutComponent } from './generic/logout/logout.component';
import { AccountStatementComponent } from './generic/account-statement/account-statement.component';
import { UpdateCustomerComponent } from './Supplier/update-customer/update-customer.component';
import { UpdateItemComponent } from './Supplier/update-item/update-item.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'supplier', component: SupplierHomeComponent, canActivate: [AuthGuard], data: { role: 'Supplier' },
    children: [
      { path: 'items', component: ItemsComponent },
      { path: 'items-view', component: ItemsComponent },
      { path: 'add-item', component: AddItemComponent },
      { path: 'update-Item/:id', component: UpdateItemComponent },
      { path: 'customers-view', component: CustomersViewComponent },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: 'update-customer/:id', component: UpdateCustomerComponent },
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
      { path: 'logout', component: LogoutComponent }
    ]
  },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'Admin' },
    children: [
      { path: 'suppliers-view', component: SuppliersViewComponent },
      { path: 'cheques', component: ChequesComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'customers-view/:id', component: CustomersViewComponent },
      { path: 'add-supplier', component: AddSupplierComponent },
      { path: 'update-supplier/:id', component: UpdateSupplierComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },
  { path: 'customer', component: CustomerHomeComponent, canActivate: [AuthGuard], data: { role: 'Customer' } }
]
