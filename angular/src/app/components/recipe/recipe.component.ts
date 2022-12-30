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
  ingredient1 = '';
  ingredient2 = '';
  ingredient3 = '';
  ingredient4 = '';
  ingredient5 = '';
  ingredient6 = '';
  ingredient7 = '';
  ingredient8 = '';
  ingredient9 = '';
  ingredient10 = '';
  ingredient11 = '';
  ingredient12 = '';
  ingredient13 = '';
  ingredient14 = '';
  ingredient15 = '';
  ingredient16 = '';
  ingredient17 = '';
  ingredient18 = '';
  ingredient19 = '';
  ingredient20 = '';

  measures: string[] = [];
  measure1 = '';
  measure2 = '';
  measure3 = '';
  measure4 = '';
  measure5 = '';
  measure6 = '';
  measure7 = '';
  measure8 = '';
  measure9 = '';
  measure10 = '';
  measure11 = '';
  measure12 = '';
  measure13 = '';
  measure14 = '';
  measure15 = '';
  measure16 = '';
  measure17 = '';
  measure18 = '';
  measure19 = '';
  measure20 = '';

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

          this.ingredients[0] = data.meals[0].strIngredient1;
          this.ingredients[1] = data.meals[0].strIngredient2;
          this.ingredients[2] = data.meals[0].strIngredient3;
          this.ingredients[3] = data.meals[0].strIngredient4;
          this.ingredients[4] = data.meals[0].strIngredient5;
          this.ingredients[5] = data.meals[0].strIngredient6;
          this.ingredients[6] = data.meals[0].strIngredient7;
          this.ingredients[7] = data.meals[0].strIngredient8;
          this.ingredients[8] = data.meals[0].strIngredient9;
          this.ingredients[9] = data.meals[0].strIngredient10;
          this.ingredients[10] = data.meals[0].strIngredient11;
          this.ingredients[11] = data.meals[0].strIngredient12;
          this.ingredients[12] = data.meals[0].strIngredient13;
          this.ingredients[13] = data.meals[0].strIngredient14;
          this.ingredients[14]= data.meals[0].strIngredient15;
          this.ingredients[15] = data.meals[0].strIngredient16;
          this.ingredients[16] = data.meals[0].strIngredient17;
          this.ingredients[17] = data.meals[0].strIngredient18;
          this.ingredients[18] = data.meals[0].strIngredient19;
          this.ingredients[19] = data.meals[0].strIngredient20;

          this.measures[0] = data.meals[0].strMeasure1;
          this.measures[1] = data.meals[0].strMeasure2;
          this.measures[2] = data.meals[0].strMeasure3;
          this.measures[3] = data.meals[0].strMeasure4;
          this.measures[4] = data.meals[0].strMeasure5;
          this.measures[5] = data.meals[0].strMeasure6;
          this.measures[6] = data.meals[0].strMeasure7;
          this.measures[7] = data.meals[0].strMeasure8;
          this.measures[8] = data.meals[0].strMeasure9;
          this.measures[9] = data.meals[0].strMeasure10;
          this.measures[10] = data.meals[0].strMeasure11;
          this.measures[11] = data.meals[0].strMeasure12;
          this.measures[12] = data.meals[0].strMeasure13;
          this.measures[13] = data.meals[0].strMeasure14;
          this.measures[14]= data.meals[0].strMeasure15;
          this.measures[15] = data.meals[0].strMeasure16;
          this.measures[16] = data.meals[0].strMeasure17;
          this.measures[17] = data.meals[0].strMeasure18;
          this.measures[18] = data.meals[0].strMeasure19;
          this.measures[19] = data.meals[0].strMeasure20;

          this.getIngredientsSorted();

        },
        error: (e) => console.error(e)
      });
  }

  getIngredientsSorted(): void {
    for (let i = 0; i<20; i++){
      if (this.ingredients[i] != ''){
        let str = this.measures[i].concat(' ', this.ingredients[i])
        this.sortedIngredients.push(str);
      }
    } 

  }

}