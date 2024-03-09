import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable,BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedIn = false;

  constructor(private httpClient:HttpClient) {}

  signIn(user: User): Observable<any>{

    return this.httpClient.post<any>('/api/users',user);
  }

  login(user: User): Observable<any>{

    return this.httpClient.post<any>('/api/users/login',user)
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  isLoggedIn(): boolean {

    return this.loggedIn;
  }
  
}
