import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PantryService } from 'src/app/services/pantry.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  mail! : String;
  ingredientform! : FormGroup;
  pantry! : string[];
  id! : any;

  constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    private pantryService: PantryService,
  ){}

  ngOnInit() {
    this.ingredientform = this.formBuilder.group({
      ingredient: [null]
    });
    this.updateUser();
  }

  updateUser(){
    this.id = this.userService.userId;
    this.userService.getUser(this.id)
          .subscribe({
              next: (data :any) => {
                this.mail = data.email;
                this.pantry = data.pantry;
              }    
        })
  }
 
  addIngredient(){
    this.pantryService.addIngredient(this.id, this.ingredientform.get('ingredient')?.value)
    .then((data : any) => { 
      console.log(data.message);
      this.updateUser();})
    .catch((error : any) => { console.error(error.message)});
  }
  
  removeIngredient(item : string){
    console.log(item);
    this.pantryService.removeIngredient(this.id, item)
      .then((data : any) => { 
        console.log(data.message);
        this.updateUser();})
      .catch((error : any) => { console.error(error.message)});
  }

  removeAllIngredients(){
    this.pantryService.removeAllIngredients(this.id)
    .then((data : any) => { 
      console.log(data.message);
      this.updateUser();})
    .catch((error : any) => { console.error(error.message)});
  }

}
