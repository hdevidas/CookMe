import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { PentryService } from 'src/app/services/pentry.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  mail! : String;
  ingredientform! : FormGroup;
  pentry! : string[];
  id! : any;

  constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pentryService: PentryService,
  ){}

  ngOnInit() {
    this.ingredientform = this.formBuilder.group({
      ingredient: [null]
    });
    this.id = this.userService.userId;
    this.updateUser();
  }

  updateUser(){
    this.userService.getUser(this.id)
          .subscribe({
              next: (data :any) => {
                this.mail = data.email;
                this.pentry = data.pentry;
              }    
        })
  }

  

  addIngredient(){
    const ingredient = this.ingredientform.get('ingredient')?.value;
    this.changeIngredients(ingredient);
  }

  removeAllIngredients(){
    const empty : string[] = []
    this.changeIngredients(empty);
  }

  changeIngredients( ingredients : string[]){
    this.pentryService.addIngredient(this.id, ingredients)
    .then((data : any) => { 
      console.log(data.message);
      this.updateUser();})
    .catch((error : any) => { console.error(error.message)});
  }
  
  deleteElement(item : string){
    console.log(item);
    this.pentryService.removeOneIngredient(this.id, item)
      .then((data : any) => { 
        console.log(data.message);
        this.updateUser();})
      .catch((error : any) => { console.error(error.message)});
  }
}
