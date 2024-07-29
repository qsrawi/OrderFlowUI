import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user'
import { Store } from '@ngrx/store';
import { selectUserRole } from '../store/selectors/auth.selectors';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store) {}

  getUserRole(): Observable<string | undefined> {
    return this.store.select(selectUserRole);
  }
}