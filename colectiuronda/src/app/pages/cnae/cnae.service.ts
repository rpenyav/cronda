import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class CnaeTypeService {
  private ENDPOINT = API_ENDPOINTS.CNAE_ENDPOINT;

  constructor(private http: HttpClient) {}

  getCnaeTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createCnaeType(cnaeType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, cnaeType);
  }

  updateCnaeType(id: number, cnaeType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, cnaeType);
  }

  deleteCnaeType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
