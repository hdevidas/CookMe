import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @Input() currentUser: User = {
    email: '',
    password: '',
    pentry : []
  };

  name! : String;
  mail! : String;
  ingredientform!: FormGroup;
  
  message!: string;

  constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.ingredientform = this.formBuilder.group({
      ingredient: [null]
    });

  }
  
  updateUser(){
    console.log("methode updateUser not donne yet");
  }

  addIngredient(){
    const ingredient = this.ingredientform.get('ingredient')?.value;

    this.userService.addIngredient(this.userService.userId, ingredient)
      .then((data : any) => { this.message = data.message })
      .catch((error : any) => { this.message =  error.message }); 
  }

}
