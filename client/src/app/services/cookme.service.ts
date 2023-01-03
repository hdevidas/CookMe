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
      .subscribe(
        (response: any) => { resolve(response) },
        (error) => { reject(error); }
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

  //TO MOVE SOMEWHERE ELSE LATER
  //GET A RANDOM MEAL (to test mealdbapi)
  getRandomMeal(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/recipe`);
  }

  //TO MOVE SOMEWHERE ELSE LATER
  //GET A SPECIFIC MEAL BY NAME
  getRecipeByName(name: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/recipe/${name}`);
  }

  //TO MOVE SOMEWHERE ELSE LATER
  //GET A LIST OF RECIPES WICH CONTAIN A SPECIFIC INGREDIENT
  getRecipes(ingredient: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/recipes/${ingredient}`);
  }

  //TO MOVE SOMEWHERE ELSE LATER
  //GET A LIST OF INGREDIENTS WHICH CONTAIN A SPECIFIC TERM
  searchIngredientWithTerm(term: string): Observable<string[]> {
    if(term.length <= 1) {
      return of([]);
    } 

    return this.http.get<string[]>(`${baseUrl}/ingredients/${term}`);
  }

}