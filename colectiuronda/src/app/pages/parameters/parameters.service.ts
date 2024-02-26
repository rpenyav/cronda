import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class ParametersTypeService {
  private ENDPOINT = API_ENDPOINTS.DOMAINS_ENDPOINT;

  constructor(private http: HttpClient) {}

  getParametersTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createParametersType(parametersType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, parametersType);
  }

  updateParametersType(id: number, parametersType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, parametersType);
  }

  deleteParametersType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
