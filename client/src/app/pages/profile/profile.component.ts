import { Component, Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PantryService } from 'src/app/services/pantry.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { PopUpComponent } from '../../components/pop-up/pop-up.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  showProfile = true;
  showEmail = true;

  mail! : string;
  pantry! : string[];
  id! : any;

  searchTerms = new Subject<string>();
  ingredients$: Observable<string[]> | undefined;

  message!: string;
  
  private isAuthSub!: Subscription;


  constructor(
    private popUp: MatDialog,
    private recipeService: RecipeService,
    private userService : UserService,
    private pantryService: PantryService,
    private router: Router
  ){}

  ngOnInit() {
    this.isAuthSub = this.userService.isAuth$.subscribe(
      (auth) => {
        if (!auth)
          this.router.navigateByUrl('/login');
      }
    );
    this.searchIngredients();
    this.updateUser();
  }

  openPopUp(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { message: data.message };
    this.popUp.open(PopUpComponent, dialogConfig);
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

  isPantryEmpty() :boolean{
    return !this.pantry || this.pantry.length === 0;
  }

  changeEmail() :void{
    this.userService.editUserData(this.userService.getUserId(), this.mail)
      .then((response: any) => {
        response.message = "Your email has been successfully changed, you can now reconnect using this new email!"
        this.openPopUp(response);
      })
      .catch((error) => {
        this.message = error.error ? error.error.message : error.message;
      }
    );
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
    this.id = this.userService.getUserId();
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


