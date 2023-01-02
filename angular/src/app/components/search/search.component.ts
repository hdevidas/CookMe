import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { CookmeService } from 'src/app/services/cookme.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerms = new Subject<string>();
  ingredients$: Observable<string[]> | undefined ;

  constructor(
    private cookmeService: CookmeService
    ) { }

  ngOnInit(): void {
    this.ingredients$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(600),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.cookmeService.searchIngredientWithTerm(term))
      // {.....ingredientList(ab)............ingredientList(abc)......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term.toLowerCase());
  }

  goToDetail(ingredient: string) {
    console.log(ingredient)
  }


}
