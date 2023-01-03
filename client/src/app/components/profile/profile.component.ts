import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookmeService } from 'src/app/services/cookme.service';
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
  ingredientform! : FormGroup;

  constructor(
    private CookmeService : CookmeService,
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

    this.CookmeService.addIngredient(this.CookmeService.userId, ingredient)
      .then((data : any) => { console.log(data.message)})
      .catch((error : any) => { console.error(error.message)});
     
  }

  
}
