import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class BanksTypeService {
  private ENDPOINT = API_ENDPOINTS.BANKS_ENDPOINT;

  constructor(private http: HttpClient) {}

  getBanksTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createBanksType(banksType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, banksType);
  }

  updateBanksType(id: number, banksType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, banksType);
  }

  deleteBanksType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
