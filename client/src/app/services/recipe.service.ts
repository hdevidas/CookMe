import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/cookme';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    constructor(private http: HttpClient) { }

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