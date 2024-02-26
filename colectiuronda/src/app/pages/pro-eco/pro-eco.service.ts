import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class ProEcoTypeService {
  private ENDPOINT = API_ENDPOINTS.PRO_ECO;

  constructor(private http: HttpClient) {}

  getProEcoTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createProEcoType(proEcoType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, proEcoType);
  }

  updateProEcoType(id: number, proEcoType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, proEcoType);
  }

  deleteProEcoType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
