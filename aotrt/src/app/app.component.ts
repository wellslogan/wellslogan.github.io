import { Component } from '@angular/core';
import { InitData } from './app.initdata';
import { Ingredient } from './models/model.ingredient';
import { Recipe } from './models/model.recipe';
import { Board } from './models/model.board';
import { ChangelogEntry } from './models/model.changelogEntry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements IAppComponent {
  changelog: ChangelogEntry[];
  ingredients = [];
  boards = [];
  recipes = [];
  magicNumber = 0;

  constructor() {
    let init = new InitData();
    this.ingredients = init.ingredients;
    this.recipes = init.recipes;
    this.boards = init.boards;

    this.changelog = [
      new ChangelogEntry(
        "0.1.3",
        "Fri 2017/07/07 10:30 PM EDT",
        [
          "Added titles for each board",
        ]
      ),
      new ChangelogEntry(
        "0.1.2",
        "Fri 2017/07/07 8:30 PM EDT",
        [
          "Split ingredients list by in-game chalk board",
          "Fixed recipes for methylbenzene, dinitro"
        ]
      ),
      new ChangelogEntry(
        "0.1.1",
        "Fri 2017/07/07 7:30 PM EDT",
        [
          "Added changelog"
        ]
      ),
      new ChangelogEntry(
        "0.1.0",
        "Fri 2017/07/07 7:15 EDT",
        [
          "Initial release"
        ]
      )
    ]
    
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

