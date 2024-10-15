import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";

import { Epic } from "../model/epic.entity";

@Injectable({
  providedIn: 'root'
})
export class EpicsService {
  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/epics';  // Ajusta el endpoint según sea necesario

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something happened with the request; please try again later.'));
  }

  // Create Resource
  create(item: Epic): Observable<Epic> {
    return this.http.post<Epic>(this.resourcePath(), item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Resource
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Resource
  update(id: number, item: Epic): Observable<Epic> {
    return this.http.put<Epic>(`${this.resourcePath()}/${id}`, item, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Resources
  getAll(): Observable<Epic[]> {
    return this.http.get<Epic[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  private resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }
}
