import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PantryService } from 'src/app/services/pantry.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  mail! : String;
  pantry! : string[];
  id! : any;

  searchTerms = new Subject<string>();
  ingredients$: Observable<string[]> | undefined ;


  constructor(
    private recipeService: RecipeService,
    private userService : UserService,
    private pantryService: PantryService,
  ){}

  ngOnInit() {
    this.searchIngredients();
    this.updateUser();
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

  changeEmail() :void{
    //TODO
  }

  resetPassword() :void{
    //TODO
  }
 
  addIngredient(ingredient: string){
    this.pantryService.addIngredient(this.id, ingredient)
    .then((data : any) => { 
      this.updateUser();})
    .catch((error : any) => { console.error(error.message)});

    this.updateUser();
    this.searchIngredients();
  }
  
  removeIngredient(item : string){
    this.pantryService.removeIngredient(this.id, item)
      .then((data : any) => { 
        this.updateUser();})
      .catch((error : any) => { console.error(error.message)});
  }

  removeAllIngredients(){
    this.pantryService.removeAllIngredients(this.id)
    .then((data : any) => { 
      this.updateUser();})
    .catch((error : any) => { console.error(error.message)});
  }

  updateUser(){
    this.id = this.userService.userId;
    this.userService.getUser(this.id)
          .subscribe({
              next: (data :any) => {
                this.mail = data.email;
                this.pantry = [];
                this.pantry = data.pantry;
              }    
        })
  }


  setupRandomPantry(){
    this.pantryService.setupRandomPantry(this.id)
    .then((data : any) => { 
      this.updateUser();
      // this.searchIngredients();
    })
    .catch((error : any) => { console.error(error.message)});

    // this.updateUser();
    
  }

}


