import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from "./user";
import { USERS } from "./mock-users";
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private usersUrl = 'http://localhost:8000/users/'

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  getUsers(): Observable<User[]> {
    console.log(this.usersUrl);
    const users = this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(userList => this.log(`Usuários obtidos!`)),
        catchError(this.handleError<User[]>('getUsers', []))
      );
    return users;
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.usersUrl}${userId}/`
    console.log(url);
    return this.http.get<User>(url)
      .pipe(
        tap(user=>this.log(`Usuário obtido possui id: ${user.id}!`)),
        catchError(this.handleError<User>(`getHero id:${userId}`))
      );
  }

  addUser(user: User): Observable<User> {
    const url = `${this.usersUrl}accounts/register/`
    return this.http.post<User>(url, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => this.log(`Novo usuário adicionado w/ id:${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
      );
  }

  deleteUser(userId: number): Observable<User> {
    const url = `${this.usersUrl}${userId}/`;
    return this.http.delete<User>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Usuário com id: ${userId} deletado com sucesso!`)),
        catchError(this.handleError<User>('deleteUser'))
      );
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.usersUrl}${user.id}/`
    return this.http.put(url, user, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Usuário com id:${user.id} atualizado com sucesso!`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }
}
