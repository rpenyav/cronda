import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class PayMethodsTypeService {
  private ENDPOINT = API_ENDPOINTS.PAY_METHODS;

  constructor(private http: HttpClient) {}

  getpayMethodsTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createpayMethodsType(payMethodsType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, payMethodsType);
  }

  updatepayMethodsType(id: number, payMethodsType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, payMethodsType);
  }

  deletepayMethodsType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
