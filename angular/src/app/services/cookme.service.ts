import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
  providedIn: 'root'
})
export class CookmeService {

  token!: string;
  userEmail!: string;

  constructor(private http: HttpClient) { }

  /* Méthode permettant de lancer une requête sur le back pour la création d'un compte utilisateur  */
  createNewUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
    this.http.post(baseUrl+'/signup',{ email: email, password: password })
        .subscribe( () => {
                this.login(email, password)
                    .then(() => { resolve(); })
                    .catch((error) => { reject(error); });
        },
            (error) => {
            reject(error);
        }
        );
    });
  }

  /* Méthode permettant de lancer une requête sur le back pour la connexion utilisateur  */
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
        this.http.post(baseUrl+'/login', { email: email, password: password })
            .subscribe(
                (authData: any) => {
                    this.token = authData.token;
                    this.userEmail = authData.email;
                    resolve(authData);
                },
                (error) => { reject(error); }
            );
        }
    );
  }

  /* Méthode pour la déconnexion d'un utilisateur */
  logout() {
    this.userEmail = '';
    this.token = '';
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/login/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/login/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/login/${id}`);
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