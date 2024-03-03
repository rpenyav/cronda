import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getAuthToken } from 'src/utils/getToken';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
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
   * Recupera tipus de registre paginades del servidor.
   * @param endpoint
   * @param pageNumber
   * @param pageSize
   * @returns
   */
  getRegisterTypes<T>(
    endpoint: string,
    pageNumber: number = 0,
    pageSize: number = 999
  ): Observable<T> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    };
    //TODO dinamizar el sort by
    return this.http
      .get<T>(
        `${endpoint}/paged?page=${params.pageNumber}&pagesize=${params.pageSize}&sortField=name&sortType=ASC`,
        {
          headers: this.getHeaders(),
          params,
        }
      )
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error en la obtención de registros. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Recupera un tipus de registre per la seva ID.
   * @param id La ID del tipus de registre a recuperar.
   * @returns Un Observable del tipus de registre.
   */

  getRegisterTypeById<T>(endpoint: string, id: number): Observable<T | null> {
    return this.http
      .get<T>(`${endpoint}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error al obtener el registro por ID. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Crea un nou tipus de registre.
   * @param registreType El tipus de registre a crear.
   * @returns Un Observable del nou tipus de registre creat.
   */
  createRegisterType<T>(endpoint: string, registreType: T): Observable<T> {
    return this.http
      .post<T>(`${endpoint}/`, registreType, { headers: this.getHeaders() })
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error al crear el registro. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Función para convertir CSV a JSON
   * @param file
   * @returns
   */

  uploadFileToServer(endpoint: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const localhost = 'http://localhost:3000/banks';
    console.log(endpoint);
    //const url = `${endpoint}/upload-massive`;
    const url = `${localhost}/upload-massive`;
    let headers = this.getHeaders();
    headers = headers.delete('Content-Type');

    return this.http
      .post(url, formData, {
        headers: headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error en uploadFileToServer', error);
          return throwError(
            () => new Error('Error en la subida del archivo CSV')
          );
        })
      );
  }

  /**
   * Actualitza un tipus de registre existent.
   * @param id La ID del tipus de registre a actualitzar.
   * @param registreType Les dades actualitzades del tipus de registre.
   * @returns Un Observable del tipus de registre actualitzat.
   */
  updateRegisterType<T, R>(
    endpoint: string,
    id: number,
    registreType: T
  ): Observable<R> {
    return this.http
      .put<R>(`${endpoint}/${id}`, registreType, { headers: this.getHeaders() })
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error al actualizar el registro. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }

  /**
   * Elimina un tipus de registre per la seva ID.
   * @param id La ID del tipus de registre a eliminar.
   * @returns Un Observable que indica el resultat de l'operació d'eliminació.
   */

  deleteRegisterType<R>(endpoint: string, id: number): Observable<R> {
    return this.http
      .delete<R>(`${endpoint}/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(() => {
          return throwError(
            () =>
              new Error(
                'Error al eliminar el registro. Por favor, inténtelo de nuevo más tarde.'
              )
          );
        })
      );
  }
}
