import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';
import * as CartActions from '../../store/actions/cart.actions';
import { selectCartItems, selectCartTotalPrice, selectSupplierId } from '../../store/selectors/cart.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../store/reducers/cart.reducer';
import { selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;
  userRole$: Observable<string | undefined>;
  userId$: Observable<number| undefined>;
  currentSupplierId$: Observable<number>;

  supplierId: number | undefined;
  customerId: number | undefined;
  userId: number | undefined;
  userRole: string | undefined;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
    this.totalPrice$ = this.cartItems$.pipe(
      map((items: CartItem[]) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    );
    this.currentSupplierId$ = this.store.select(selectSupplierId);
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => this.userRole = role);
    this.userId$.subscribe(userId => this.userId = userId);
    this.currentSupplierId$.subscribe(currentSupplierId => this.supplierId = currentSupplierId);
  }

  removeItem(itemId: number): void {
    this.store.dispatch(CartActions.removeItem({ itemId }));
  }

  decreaseQuantity(itemId: number): void {
    this.store.dispatch(CartActions.decreaseQuantity({ itemId }));
  }

  increaseQuantity(itemId: number): void {
    this.store.dispatch(CartActions.increaseQuantity({ itemId }));
  }

  placeOrder() {
    this.cartItems$.pipe(
      take(1),
      map(cartItems => {
        const orderItems = cartItems.map(item => ({
          ...item,
          price: item.price * item.quantity
        }
      )
    );
  
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price, 0);
    this.store.dispatch(
      CartActions.placeOrder({
        orderItems,
        total: totalPrice,
        supplierId: this.supplierId,
        customerId: this.userRole === 'Customer'? this.userId : undefined,
        tradingSupplierId: this.userRole === 'Supplier'? this.userId : undefined
        })
      );
    })
    ).subscribe();
  }
}
