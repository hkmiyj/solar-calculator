import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new user
  saveUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
