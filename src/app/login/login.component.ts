import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/reducers/auth.reducer';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as AuthActions from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = '';

  constructor(private store: Store<{ auth: AuthState }>) {
    this.store.select('auth').subscribe(authState => {
      this.error = authState.error;
    });
  }

  onSubmit() {
    this.store.dispatch(AuthActions.login({ username: this.username, password: this.password }));
  }
}
