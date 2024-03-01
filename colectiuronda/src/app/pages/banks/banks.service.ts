import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as Papa from 'papaparse';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';
import { getAuthToken } from 'src/utils/getToken';
import { MOCK_BANKS } from 'src/app/mock/banks-mock';
import {
  PaginatedResponse,
  Bank,
  NewBanksPayload,
  NewBank,
} from 'src/app/interfaces/banks';

interface CsvBankRecord {
  'CÓDIGO DE SUPERVISOR ': string;
  NOMBRE: string;
}

@Injectable({
  providedIn: 'root',
})
export class BanksTypeService {
  private ENDPOINT = API_ENDPOINTS.BANKS_ENDPOINT;

  constructor(private http: HttpClient) {}

  /**
   * Genera capçaleres per a les sol·licituds HTTP.
   * @returns HttpHeaders amb l'autorització inclosa.
   */
  private getHeaders(): HttpHeaders {
    const authToken = getAuthToken();
    return new HttpHeaders({ Authorization: `Bearer ${authToken}` });
  }

  /**
   * Recupera tipus de províncies paginades del servidor.
   * @param pageNumber El número de pàgina a recuperar.
   * @param pageSize El nombre d'elements per pàgina.
   * @returns Un Observable de la resposta paginada.
   */
  getBanksTypes(
    pageNumber: number = 0,
    pageSize: number = 999
  ): Observable<PaginatedResponse> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    };
    //TODO dinamizar el sort by
    return this.http
      .get<PaginatedResponse>(
        `${this.ENDPOINT}/paged?page=${params.pageNumber}&pagesize=${params.pageSize}&sortField=name&sortType=ASC`,
        {
          headers: this.getHeaders(),
          params,
        }
      )
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud GET:', params)
        ),
        catchError((error) => {
          console.error('Error ocorregut en geBanksTypes:', error);
          return throwError(() => new Error('Error en getBanksTypes'));
        })
      );
  }

  /**
   * Recupera un tipus de província per la seva ID.
   * @param id La ID del tipus de província a recuperar.
   * @returns Un Observable del tipus de província.
   */

  getBankTypeById(id: number): Observable<Bank | null> {
    return this.http
      .get<Bank>(`${this.ENDPOINT}/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud GET:', response)
        ),
        catchError((error) => {
          console.error('Error ocorregut en getBankTypeById:', error);
          return throwError(() => new Error('Error en getBankTypeById'));
        })
      );
  }

  /**
   * Crea un nou tipus de registre.
   * @param registreType El tipus de registre a crear.
   * @returns Un Observable del nou tipus de registre creat.
   */
  createBanksType(registreType: Bank): Observable<Bank> {
    return this.http
      .post<Bank>(this.ENDPOINT, registreType, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud POST:', response)
        ),
        catchError((error) => {
          console.error('Error ocorregut en createBanksType:', error);
          return throwError(() => new Error('Error en createBanksType'));
        })
      );
  }

  /**
   * Función para convertir CSV a JSON
   * @param file
   * @returns
   */

  uploadFileTOJSON(file: File): Observable<any> {
    return new Observable((observer) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as CsvBankRecord[];
          const transformedData: NewBank[] = data.map((item) => ({
            code: item['CÓDIGO DE SUPERVISOR ']
              ? item['CÓDIGO DE SUPERVISOR '].trim()
              : '',
            name: item['NOMBRE'] ? item['NOMBRE'].trim() : '',
            countryCode: 'ES', // Asumiendo que el código de país es siempre "ES"
          }));

          console.log('Datos transformados:', transformedData);

          // Crea el payload utilizando la interfaz NewBanksPayload
          const payload: NewBanksPayload = {
            newBanks: transformedData,
          };

          // Ahora puedes enviar `payload` al servidor
          this.createMassiveBanksType(payload).subscribe({
            next: (response) => {
              observer.next(response);
              observer.complete();
            },
            error: (error) => observer.error(error),
          });
        },
        error: (error) => observer.error(error),
      });
    });
  }

  /**
   * Crea un nou tipus de registre MASSIU.
   * @param registreType El tipus de registre a crear.
   * @returns Un Observable del nou tipus de registre creat.
   */
  createMassiveBanksType(payload: NewBanksPayload): Observable<any> {
    const url = `${this.ENDPOINT}/update`; // Asegúrate de que esta URL sea correcta para tu API

    return this.http
      .put(url, payload, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error en createMassiveBanksType', error);
          throw new Error('Error en la actualización de bancos');
        })
      );
  }

  /**
   * Actualitza un tipus de registre existent.
   * @param id La ID del tipus de registre a actualitzar.
   * @param registreType Les dades actualitzades del tipus de registre.
   * @returns Un Observable del tipus de registre actualitzat.
   */
  updateBanksType(id: number, registreType: Bank): Observable<Bank> {
    return this.http
      .put<Bank>(`${this.ENDPOINT}/${id}`, registreType, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud PUT:', response)
        ),
        catchError((error) => {
          console.error('Error ocorregut en updateBanksType:', error);
          return throwError(() => new Error('Error en updateBanksType'));
        })
      );
  }

  /**
   * Elimina un tipus de registre per la seva ID.
   * @param id La ID del tipus de registre a eliminar.
   * @returns Un Observable que indica el resultat de l'operació d'eliminació.
   */
  deleteBanksType(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.ENDPOINT}/${id}`, { headers: this.getHeaders() })
      .pipe(
        tap((response) =>
          console.log('Resposta de la sol·licitud DELETE:', response)
        ),
        catchError((error) => {
          console.error('Error ocorregut en deleteBanksType:', error);
          return throwError(() => new Error('Error en deleteBanksType'));
        })
      );
  }
}
