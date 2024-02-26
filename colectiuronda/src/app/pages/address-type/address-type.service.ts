import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class AddressTypeService {
  private ENDPOINT = API_ENDPOINTS.ADDRESS_TYPES_ENDPOINT;

  constructor(private http: HttpClient) {}

  getAddressTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.ENDPOINT);
  }

  createAddressType(addressType: any): Observable<any> {
    return this.http.post<any>(this.ENDPOINT, addressType);
  }

  updateAddressType(id: number, addressType: any): Observable<any> {
    return this.http.put<any>(`${this.ENDPOINT}/${id}`, addressType);
  }

  deleteAddressType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ENDPOINT}/${id}`);
  }
}
