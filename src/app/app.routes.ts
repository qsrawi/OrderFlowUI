import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SupplierHomeComponent } from './Supplier/supplier-home/supplier-home.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { CustomerHomeComponent } from './Customer/customer-home/customer-home.component';
import { AuthGuard } from './auth.guard';
import { SuppliersViewComponent } from './Admin/suppliers-view/suppliers-view.component';
import { ChequesComponent } from './Admin/cheques/cheques.component';
import { AddSupplierComponent } from './Admin/add-supplier/add-supplier.component';
import { ItemsComponent } from './Admin/items/items.component';
import { OrderComponent } from './Admin/orders/orders.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'supplier', component: SupplierHomeComponent, canActivate: [AuthGuard], data: { role: 'Supplier' } },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'Admin' },
    children: [
      { path: 'add-supplier', component: AddSupplierComponent },
      { path: 'suppliers-view', component: SuppliersViewComponent },
      { path: 'cheques', component: ChequesComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'items', component: ItemsComponent },
    ]
  },
  { path: 'customer', component: CustomerHomeComponent, canActivate: [AuthGuard], data: { role: 'Customer' } }
]
