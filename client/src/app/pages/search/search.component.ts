import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Observable, reduce, Subject, Subscription, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private isAuthSub!: Subscription;
  
  idUser! : any;
  recipes: any[] = [];

  searchTerms = new Subject<string>();
  ingredients$: Observable<string[]> | undefined ;
  currentIngredient: string = "";


  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isAuthSub = this.userService.isAuth$.subscribe(
      (auth) => {
        if (!auth)
          this.router.navigateByUrl('/login');
      }
    );
    this.idUser = this.userService.getUserId();
    this.searchIngredients();
  }

  search(term: string) {
    this.searchTerms.next(term.toLowerCase());
    this.recipes=[];
  }

  searchIngredients() {
    this.ingredients$ = this.searchTerms.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((term) => this.recipeService.searchIngredientWithTerm(term)),
    );
  }

  setCurrentIngredient(ingredient: string) {
    this.currentIngredient = ingredient;
    this.searchIngredients();
    this.retrieveRecipes();
  }

  retrieveRecipes(): void {
    this.recipeService.getRecipes(this.currentIngredient,this.idUser)
      .subscribe({
        next: (data) => {
          this.recipes = data;
        },
        error: (e) => console.error(e)
      });
  }
}

