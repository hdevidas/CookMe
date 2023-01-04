import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit{

  name: string = '';
  instructions = '';
  img = '';

  ingredients: string[] = [];

  measures: string[] = [];

  sortedIngredients: String[] = [];

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params["name"];
    this.getDatas();
  }

  getDatas(): void {
    //console.log(this.name);
    this.recipeService.getRecipeByName(this.name)
      .subscribe({
        next: (data) => {
          //console.log(data.meals[0])
          this.name = data.meals[0].strMeal;
          this.instructions = data.meals[0].strInstructions;
          this.img = data.meals[0].strMealThumb;

          for (let i = 0; i<20;i++){
            this.ingredients[i] = data.meals[0]["strIngredient"+(i+1)];
            this.measures[i] = data.meals[0]["strMeasure"+(i+1)];
          }
      
          this.getIngredientsSorted();

        },
        error: (e) => console.error(e)
      });
  }

  getIngredientsSorted(): void {
    for (let i = 0; i<20; i++){
      if (this.ingredients[i] != '' && this.ingredients[i] != null){
        let str = this.measures[i].concat(' ', this.ingredients[i])
        this.sortedIngredients.push(str);
      }
    } 

  }

}