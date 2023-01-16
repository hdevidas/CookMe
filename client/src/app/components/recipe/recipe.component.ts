import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit{

  name: string = '';
  instructions = [];
  img = '';

  ingredients: string[] = [];

  pantryIngredients: string[] = [];

  //sortedIngredients: String[] = [];

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params["name"];
    this.getDatas();
  }

  getDatas(): void {
    this.recipeService.getRecipeByNameAndId(this.name, this.userService.getUserId())
      .subscribe({
        next: (data) => {
          this.name = data.name;
          this.img = data.img;
          this.instructions = data.instructions;
          this.ingredients = data.ingredients.split(',');
          this.pantryIngredients = data.pantryIngredients.split(',');
          
          this.removeEmptyIngredients();
        },
        error: (e) => console.error(e)
      });
  }

  removeEmptyIngredients(): void {
    while (this.ingredients.at(this.ingredients.length-1) == ' '|| this.ingredients.at(this.ingredients.length-1) =='  '){
      this.ingredients.pop();
    }
    if (this.pantryIngredients.at(0) == ""){
      this.pantryIngredients = [];
    }
  }

}