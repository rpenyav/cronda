import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class DomainsTypeService {
  private ENDPOINT = API_ENDPOINTS.DOMAINS_ENDPOINT;

  constructor(private http: HttpClient) {}

  getDomainsTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createDomainsType(domainsType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, domainsType);
  }

  updateDomainsType(id: number, domainsType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, domainsType);
  }

  deleteDomainsType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
