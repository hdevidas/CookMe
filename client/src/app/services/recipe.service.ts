import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    constructor(private http: HttpClient) { }

    //GET A RANDOM MEAL (to test mealdbapi)
    getRandomMeal(): Observable<any> {
        return this.http.get<any>(`${baseUrl}/recipe`);
    }

    //GET A SPECIFIC MEAL BY NAME
    getRecipeByName(name: string): Observable<any> {
        return this.http.get<any>(`${baseUrl}/recipe/${name}`);
    }

    //GET A LIST OF RECIPES WICH CONTAIN A SPECIFIC INGREDIENT
    getRecipes(ingredient: string, userId: String): Observable<any> {
        return this.http.get<any>(`${baseUrl}/recipes/${ingredient}/${userId}`);
    }

    //GET A LIST OF INGREDIENTS WHICH CONTAIN A SPECIFIC TERM
    searchIngredientWithTerm(term: string): Observable<string[]> {
        return this.http.get<string[]>(`${baseUrl}/ingredients/${term}`);
    }
}