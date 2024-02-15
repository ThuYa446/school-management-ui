import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

constructor(private httpClient: HttpClient, private message: MessageService) { }

  private log(message: string) {
    this.message.addMessage(`ErrorService: ${message}`);
  }

  doGet(url: string): Observable<any> {
    return this.httpClient.get(`${url}`).pipe(
      // tap(_ => this.log('Http Requested Successfully!')),
      catchError(this.handleError)
    );
  }

  doPost(url: string, json: JSON): Observable<any> {
    return this.httpClient.post(url, json, this.httpOptions).pipe(
      // tap(_ => this.log('Http Requested Successfully!')),
      catchError(this.handleError)
    );
  }

  checkServerErrorConnection(): boolean {
    if (this.message.message.length === 1 ) {
      return true;
    }
    return false;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `message was: ${error.error.message}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error.error.message);
  }
}
