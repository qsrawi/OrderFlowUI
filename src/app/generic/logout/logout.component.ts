import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store, private router: Router){}
  ngOnInit(): void {
    localStorage.removeItem('authToken');
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['']);
  }
}
