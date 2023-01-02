import { Component, Input } from '@angular/core';
import { CookmeService } from 'src/app/services/cookme.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent {

  currentSearch$: Observable<any[]> | undefined ;
  
  //difficulté pour le passer en string....
  @Input() currentIngredient: any;

  //ingredientToDisplay: any;
  
  recipes: any[] = [];

  constructor(
    private cookmeService: CookmeService) {
    }

    ngOnInit(): void {
      this.retrieveRecipes();
    }

    retrieveRecipes(): void {
      //this.ingredientToDisplay = this.currentIngredient;
      this.cookmeService.getRecipes(this.currentIngredient)
        .subscribe({
          next: (data) => {
            this.cookmeService.isNewIngredient$.next(false);
            this.recipes = data.meals;
          },
          error: (e) => console.error(e)
        });
    }

    refreshRecipes(): void{
      if(this.cookmeService.isNewIngredient$){
        this.retrieveRecipes();
      }
    }

    // hasChanged(): boolean{
    //   if (this.currentIngredient == this.ingredientToDisplay){
    //     return true;
    //   }
    //   return false;
    // }

}
