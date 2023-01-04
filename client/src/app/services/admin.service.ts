import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

const baseUrl = 'http://localhost:8080/api/cookme/admin';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    token!: any;
    adminId!: string;

    constructor(private http: HttpClient) { }

    /* Méthode permettant de lancer une requête sur le back pour la création d'un compte utilisateur  */
    createNewAdmin(email: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            this.http.post(baseUrl + 'admin/signup', { email: email, password: password })
                .subscribe(
                    (response: any) => { resolve(response) },
                    (error) => { reject(error); }
                );
        });
    }

    /* Méthode permettant de lancer une requête sur le back pour la connexion utilisateur  */
    adminLogin(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + '/login', { email: email, password: password })
                .subscribe(
                    (adminData: any) => {
                        this.token = adminData.token;
                        this.adminId = adminData.userId;
                        this.isAuth$.next(true);
                
                        resolve(adminData);
                    },
                    (error) => { reject(error); }
                );
        }
        );
    }

    /* Méthode pour la déconnexion d'un utilisateur */
    logout() {
        this.isAuth$.next(false);
        this.token = null;
        this.adminId = '';
    }
}