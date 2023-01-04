import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

/* Cette classe permet d'injecter des headers dans toutes nos requêtes pour s'assurer que 
    l'utilisateur est bien connecté pour la sécuritée des requêtes sensibles
*/
@Injectable() 
export class JwtAuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.userService.token;
        if (authToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }

        return next.handle(req);
    }  
}