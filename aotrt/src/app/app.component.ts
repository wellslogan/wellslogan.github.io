import { Component } from '@angular/core';
import { InitData } from './app.initdata';
import { Ingredient } from './models/model.ingredient';
import { Recipe } from './models/model.recipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements IAppComponent {
  ingredients = [];
  recipes = [];
  magicNumber = 0;

  constructor() {
    this.ingredients = InitData.ingredients();
    this.recipes = InitData.recipes(this.ingredients);
    
  }

  calculateRecipe(rec: Recipe): number {
    let result = 0;
    for (let i = 0; i < rec.ingredients.length; i++) {
      result += rec.ingredients[i].costa + rec.ingredients[i].costb;
    }
    return result - this.magicNumber;
  }

  /* "in-scope" version of global isFinite() */
  notNan(n: number): boolean {
    return isFinite(n);
  }
}

interface IAppComponent {
  ingredients: Ingredient[];
  recipes: Recipe[];
}

