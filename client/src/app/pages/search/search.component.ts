import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, reduce, Subject, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  idUser! : any;
  recipes: any[] = [];

  searchTerms = new Subject<string>();
  ingredients$: Observable<string[]> | undefined ;
  currentIngredient: string = "";

  constructor(
    private recipeService: RecipeService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.idUser = this.userService.userId;
    this.searchIngredients();
  }

  search(term: string) {
    this.searchTerms.next(term.toLowerCase());
    this.recipes=[];
  }

  searchIngredients() {
    this.ingredients$ = this.searchTerms.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((term) => this.recipeService.searchIngredientWithTerm(term)),
    );
  }

  setCurrentIngredient(ingredient: string) {
    this.currentIngredient = ingredient;
    this.searchIngredients();
    this.retrieveRecipes();
  }

  retrieveRecipes(): void {
    this.recipeService.getRecipes(this.currentIngredient,this.idUser)
      .subscribe({
        next: (data) => {
          this.recipes = data;
        },
        error: (e) => console.error(e)
      });
  }

  getColor(color1:[number, number, number], color2:[number, number, number], percent:number): [number, number, number]{
    let w1 = percent/100;
    let w2 = 1 - w1;
    let rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return [rgb[0], rgb[1], rgb[2]];
  }

  getC1(score: number){
    let color = this.getColor([0,255,0],[255,0,0], score);
    return color[0];
  }

  getC2(score: number){
    let color  = this.getColor([0,255,0],[255,0,0], score);
    return color[1];
  }

  getC3(score: number){
    let color  = this.getColor([0,255,0],[255,0,0], score);
    return color[2];
  }

}

