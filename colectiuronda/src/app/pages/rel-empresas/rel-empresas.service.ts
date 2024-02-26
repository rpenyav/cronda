import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class RelEmpresasTypeService {
  private ENDPOINT = API_ENDPOINTS.DOMAINS_ENDPOINT;

  constructor(private http: HttpClient) {}

  getRelEmpresasTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createRelEmpresasType(relEmpresasType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, relEmpresasType);
  }

  updateRelEmpresasType(id: number, relEmpresasType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, relEmpresasType);
  }

  deleteRelEmpresasType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
