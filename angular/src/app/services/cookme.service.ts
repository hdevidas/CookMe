import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
  providedIn: 'root'
})
export class CookmeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/user/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/user`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/user/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/user/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/users`);
  }

  findByName(name: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users?name=${name}`);
  }

  //Service temporaire:
  getRandomMeal(): Observable<any> {
    return this.http.get<String>(`${baseUrl}/recipe`);
  }

}