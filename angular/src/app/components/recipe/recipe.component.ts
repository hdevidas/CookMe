import { Component, OnInit } from '@angular/core';
import { CookmeService } from 'src/app/services/cookme.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit{

  name = '';
  instructions = '';
  img = '';

  ingredients: string[] = [];
  // ingredient1 = '';
  // ingredient2 = '';
  // ingredient3 = '';
  // ingredient4 = '';
  // ingredient5 = '';
  // ingredient6 = '';
  // ingredient7 = '';
  // ingredient8 = '';
  // ingredient9 = '';
  // ingredient10 = '';
  // ingredient11 = '';
  // ingredient12 = '';
  // ingredient13 = '';
  // ingredient14 = '';
  // ingredient15 = '';
  // ingredient16 = '';
  // ingredient17 = '';
  // ingredient18 = '';
  // ingredient19 = '';
  // ingredient20 = '';

  measures: string[] = [];
  // measure1 = '';
  // measure2 = '';
  // measure3 = '';
  // measure4 = '';
  // measure5 = '';
  // measure6 = '';
  // measure7 = '';
  // measure8 = '';
  // measure9 = '';
  // measure10 = '';
  // measure11 = '';
  // measure12 = '';
  // measure13 = '';
  // measure14 = '';
  // measure15 = '';
  // measure16 = '';
  // measure17 = '';
  // measure18 = '';
  // measure19 = '';
  // measure20 = '';

  sortedIngredients: String[] = [];

  constructor(private cookmeService: CookmeService) { }

  ngOnInit(): void {
    this.getDatas();
  }

  getDatas(): void {
    this.cookmeService.getRandomMeal()
      .subscribe({
        next: (data) => {
          console.log(data.meals[0])
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