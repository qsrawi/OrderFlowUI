import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user'
import { ChequeFilterParams, ChequesResponse } from '../models/cheques';
import { SuppliersResponse } from '../models/supplier';
@Injectable({
  providedIn: 'root'
})
export class HttpReqService {
    private apiUrl = 'https://localhost:7188/api';
    private userApiUrl = `${this.apiUrl}/User`;
    private supplierApiUrl = `${this.apiUrl}/Supplier`;
    private adminApiUrl = `${this.apiUrl}/Admin`;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.userApiUrl}/login`, { username, password }).pipe(
        catchError(() => of(null as any))
        );
    }

    getSuppliers(pageNumber: number, pageSize: number, filters: any): Observable<SuppliersResponse> {
        let params = new HttpParams()
            .set('PageNumber', pageNumber.toString())
            .set('PageSize', pageSize.toString());

        if (filters.name) params = params.set('Name', filters.name);
        if (filters.userName) params = params.set('UserName', filters.userName);
        if (filters.email) params = params.set('Email', filters.email);
        if (filters.phone) params = params.set('Phone', filters.phone);
        if (filters.address) params = params.set('Address', filters.address);
        if (filters.identity) params = params.set('Identity', filters.identity);

        return this.http.get<SuppliersResponse>(`${this.adminApiUrl}/GetSuppliers`, { params });
    }

    getCheques(chequeType: string, filters: ChequeFilterParams): Observable<ChequesResponse> {
        let params = new HttpParams()
            .set('PageNumber', filters.PageNumber.toString())
            .set('PageSize', filters.PageSize.toString())
            .set('chequeType', chequeType);

        if (filters.Status) params = params.set('Status', filters.Status);
        if (filters.IssueDateFrom) params = params.set('IssueDateFrom', filters.IssueDateFrom.toISOString());
        if (filters.IssueDateTo) params = params.set('IssueDateTo', filters.IssueDateTo.toISOString());
        if (filters.DueDateFrom) params = params.set('DueDateFrom', filters.DueDateFrom.toISOString());
        if (filters.DueDateTo) params = params.set('DueDateTo', filters.DueDateTo.toISOString());
        if (filters.AmountFrom) params = params.set('AmountFrom', filters.AmountFrom.toString());
        if (filters.AmountTo) params = params.set('AmountTo', filters.AmountTo.toString());
        if (filters.Currency) params = params.set('Currency', filters.Currency);
        if (filters.ChequeHolderName) params = params.set('ChequeHolderName', filters.ChequeHolderName);
        if (filters.BankName) params = params.set('BankName', filters.BankName);

        return this.http.get<ChequesResponse>(`${this.adminApiUrl}/GetCheques/${chequeType}`, { params });
    }
    
}