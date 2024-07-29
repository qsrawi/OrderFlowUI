import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { provideHttpClient } from '@angular/common/http';
import { NumberRangePipe } from './helpers/number-range.pipe';
import { suppliersReducer } from './store/reducers/suppliers.reducer';
import { SuppliersEffects } from './store/effects/suppliers.effects';

export const appConfig: ApplicationConfig = {
providers: [
  provideRouter(routes), 
  provideStore({ auth: authReducer, suppliers: suppliersReducer}), 
  provideEffects([AuthEffects, SuppliersEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: false }),
  provideHttpClient(),
  NumberRangePipe
 ]
 };
