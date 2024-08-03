import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { NumberRangePipe } from './helpers/number-range.pipe';
import { suppliersReducer } from './store/reducers/suppliers.reducer';
import { SuppliersEffects } from './store/effects/suppliers.effects';
import { ChequesEffects } from './store/effects/cheques.effects';
import { chequesReducer } from './store/reducers/cheques.reducer';
import { transactionsReducer } from './store/reducers/transactions.reducer';
import { OrdersEffects } from './store/effects/orders.effects';
import { ordersReducer } from './store/reducers/orders.reducer';
import { itemsReducer } from './store/reducers/items.reducer';
import { ItemsEffects } from './store/effects/items.effects';
import { customerReducer } from './store/reducers/customer.reducer';
import { CustomerEffects } from './store/effects/customer.effects';
import { cashReducer } from './store/reducers/cash.reducer';
import { CashEffects } from './store/effects/cash.effects';
import { receiptReducer } from './store/reducers/receipt.reducer';
import { ReceiptEffects } from './store/effects/receipt.effects';
import { imageReducer } from './store/reducers/image.reducer';
import { AuthInterceptor } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
      provideHttpClient(),
      provideRouter(routes), 
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      provideStore(
        { 
          auth: authReducer,
          suppliers: suppliersReducer,
          cheques: chequesReducer,
          transactions: transactionsReducer, 
          orders: ordersReducer,
          items: itemsReducer,
          customers: customerReducer,
          cashs: cashReducer,
          receipt: receiptReducer,
          images: imageReducer
        }
      ), 
      provideEffects([AuthEffects, SuppliersEffects, ChequesEffects, OrdersEffects, ItemsEffects, CustomerEffects, CashEffects, ReceiptEffects]),
      provideStoreDevtools({ maxAge: 25, logOnly: false }),
      NumberRangePipe
  ]
 };
