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

  NUMBER_RECIPE_MAX_TO_DISPLAY = 4;

  idUser! : any;
  pantryUser! : string[];

  searchTerms = new Subject<string>();
  ingredients$: Observable<string[]> | undefined ;
  currentIngredient: string = "";

  recipes: any[] = [];
  recipesToDisplay: [any, number, [number,number,number]][] = [];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.updateUser();
    this.searchIngredients();
  }

  search(term: string) {
    this.searchTerms.next(term.toLowerCase());
  }

  searchIngredients() {
    this.ingredients$ = this.searchTerms.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((term) => this.recipeService.searchIngredientWithTerm(term))
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
          this.buildRecipesToDisplay();
        },
        error: (e) => console.error(e)
      });
  }

  //To prepare new array
  buildRecipesToDisplay(): void {
    let recipesArrayTemp: [any, number, [number,number,number]][] = [];
    for(let i= 0; i < this.recipes.length; i++)
    {
      recipesArrayTemp[i] = [this.recipes[i], this.getScore(this.recipes[i].strMeal), this.getColor([0,255,0],[255,0,0], 0)];
      recipesArrayTemp[i][2] = this.getColor([0,255,0],[255,0,0], recipesArrayTemp[i][1]);

    }
    recipesArrayTemp.sort(this.functionComp).reverse();
    this.recipesToDisplay = recipesArrayTemp.slice(0, this.NUMBER_RECIPE_MAX_TO_DISPLAY);
  }

  functionComp(a:[any, number, [number,number,number]],b:[any, number, [number,number,number]]){
    let scoreA = a[1];
    let scoreB = b[1]; 
    return scoreA - scoreB;
  }

  //utile pour la fake function
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  getColor(color1:[number, number, number], color2:[number, number, number], percent:number): [number, number, number]{
    let w1 = percent/100;
    let w2 = 1 - w1;
    let rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return [rgb[0], rgb[1], rgb[2]];
  }

  getScore(recipeName: string): number {
    let recipe ;
    let numberIngredientsTotal = 0;
    let numberIngredientsFromUser = 0;

    this.recipeService.getRecipeByName(recipeName)
      .subscribe({
        next: (data) => {
          // console.log(data.meals[0])
          recipe = data.meals[0]
          for (let i=1;i<=20;i++){
            if (recipe["strIngredient"+i] != null && recipe["strIngredient"+i] != "" ){
              numberIngredientsTotal++;
              if (this.pantryUser.includes(recipe["strIngredient"+i])){
                numberIngredientsFromUser ++;
              }
            }
          }
          // console.log(numberIngredientsTotal);
          // console.log(numberIngredientsFromUser);
        },
        error: (e) => {
          console.error(e)
        }
      });

    //Barrier to insert here

    //Waitings real values (to remove when barrier is done)
    numberIngredientsTotal = 12;
    numberIngredientsFromUser = 7;
    return this.getRandomInt(100);

    return Math.round(numberIngredientsFromUser/numberIngredientsTotal*100);
  }

  updateUser(){
    this.idUser = this.userService.userId;
    this.userService.getUser(this.idUser)
          .subscribe({
              next: (data :any) => {
                this.pantryUser = data.pantry;
              }    
        })
  }

}

