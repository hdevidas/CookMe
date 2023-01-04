import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerms = new Subject<string>();
  ingredients$: Observable<string[]> | undefined ;
  currentIngredient: string = "";

  recipes: any[] = [];

  constructor(
    private recipeService: RecipeService
    ) { }

  ngOnInit(): void {
    this.searchIngredients();
  }

  search(term: string) {
    this.searchTerms.next(term.toLowerCase());
  }

  searchIngredients() {
    this.ingredients$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(600),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.recipeService.searchIngredientWithTerm(term))
      // {.....ingredientList(ab)............ingredientList(abc)......}
    );
  }

  setCurrentIngredient(ingredient: string) {

    this.currentIngredient = ingredient;
    this.searchIngredients();
    this.retrieveRecipes();
  }

  retrieveRecipes(): void {
    this.recipeService.getRecipes(this.currentIngredient)
      .subscribe({
        next: (data) => {
          this.recipes = data.meals;
        },
        error: (e) => console.error(e)
      });
  }

}

