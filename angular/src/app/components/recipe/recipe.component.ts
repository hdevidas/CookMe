import { Component, OnInit } from '@angular/core';
import { CookmeService } from 'src/app/services/cookme.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit{

  name = '' ;
  
  constructor(private cookmeService: CookmeService) { }

  ngOnInit(): void {
    this.retrieveRecipe();
  }

  retrieveRecipe(): void {
    this.cookmeService.getRandomMeal()
      .subscribe({
        next: (data) => {
          //this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
