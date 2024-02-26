import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class CarpetasTypeService {
  private ENDPOINT = API_ENDPOINTS.CARPETAS_ENDPOINT;

  constructor(private http: HttpClient) {}

  getCarpetasTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createCarpetasType(carpetasType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, carpetasType);
  }

  updateCarpetasType(id: number, carpetasType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, carpetasType);
  }

  deleteCarpetasType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
