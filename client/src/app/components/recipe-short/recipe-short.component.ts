import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-recipe-short]',
  templateUrl: './recipe-short.component.html'
})
export class RecipeShortComponent {
  @Input('app-recipe-short') data : any;

  name! : string;
  score! : number;
  image! : any;
  color! : number[];

  constructor(){
    
  }

  ngOnInit() : void {
    this.name = this.data[0].meals[0].strMeal;
    this.score = this.data[1];
    this.image = this.data[0].meals[0].strMealThumb;
    this.#computeColor([0,255,0],[255,0,0]);
  }

  #computeColor(color1:[number, number, number], color2:[number, number, number]){
    let w1 = this.score/100;
    let w2 = 1 - w1;
    this.color = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
  }
}
