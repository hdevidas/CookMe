import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    private token!: any;
    private userId!: string;

    constructor(private http: HttpClient) { 
        this.token = localStorage.getItem('token');
    }

    public setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }
    
    public getToken(): string {
        return this.token;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }
    
    public getUserId(): string {
        return this.userId;
    }

    /* Method to launch a request on the backend to create a user account  */
    signup(email: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(baseUrl + '/signup', { email: email, password: password, pantry: [] })
                .subscribe(
                    (response: any) => { resolve(response) },
                    (error) => { reject(error); }
                );
        });
    }

    /* Method to launch a request on the backend for the connection of a user.  */
    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + '/login', { email: email, password: password })
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

    /* Function to log out a user */
    logout() {
        this.isAuth$.next(false);
        this.token = null;
        this.userId = '';
        localStorage.removeItem('token');
    }

    /* Retrieves all registered users */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${baseUrl}/users`);
    }

    /* Allows to retrieve a user thanks to the id */
    getUser(id: any): Observable<User> {
        return this.http.get<User>(`${baseUrl}/login/${id}`);
    }

    /* Allows you to update the user's information. */
    updateUser(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}/login/${id}`, data);
    }


    editUserData(id: any, data: string) {
        return new Promise<void>((resolve, reject) => {
            this.http.put(baseUrl + '/login/'+`${id}`, { data: data })
                .subscribe(
                    (response: any) => { resolve(response) },
                    (error) => { reject(error); }
                );
        });
    }

    /* Allows to delete a user */
    deleteUser(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/login/${id}`);
    }

    /* Allows you to delete all users */
    deleteUsers(): Observable<any> {
        return this.http.delete(`${baseUrl}/users`);
    }
}