import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
  providedIn: 'root'
})
export class CookmeService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token!: any;
  userId!: string;

  constructor(private http: HttpClient) { }

  /* Méthode permettant de lancer une requête sur le back pour la création d'un compte utilisateur  */
  createNewUser(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
    this.http.post(baseUrl+'/signup',{ email: email, password: password , pentry: []})
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
                    this.userId = authData.userId;
                    this.isAuth$.next(true);
                    console.log(this.userId);

                    resolve(authData);
                },
                (error) => { reject(error); }
            );
        }
    );
  }

  addIngredient(id: any, ingredient : string) {
    return new Promise((resolve,reject) => {
      this.http.post(baseUrl+'/ingredients', {id : id, pentry: ingredient})
        .subscribe( (data) => {
          resolve(data);
        },
          (error) => { 
            reject(error);

          }
        );
    }) ;
  }

  /* Méthode pour la déconnexion d'un utilisateur */
  logout() {
    this.isAuth$.next(false);
    this.token = null;
    this.userId = '';
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

  // findByName(name: any): Observable<User[]> {
  //   return this.http.get<User[]>(`${baseUrl}/users?email=${name}`);
  // }
  

   //TO MOVE SOMEWHERE ELSE LATER
  getRandomMeal(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/recipe`);
  }

  //TO MOVE SOMEWHERE ELSE LATER
  // searchIngredientList(term: string): Observable<string[]> {
  //   return this.http.get<any>(`${baseUrl}/ingredients/${term}`);
  // }

  searchIngredientWithTerm(term: string): Observable<string[]> {
    if(term.length <= 1) {
      return of([]);
    } 

    return this.http.get<string[]>(`${baseUrl}/ingredients/${term}`);
  }

}