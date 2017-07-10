import { Ingredient } from './models/model.ingredient';
import { Recipe } from './models/model.recipe';
import { Board } from './models/model.board';
 
let boardIngredientsList = [
      ["Acetaldehyde",
      "Glycerol",
      "Methylbenzene",
      "Nitrated Glycerol Solution",
      "Mixed Acid"],
      ["Plant Food",
      "Paint",
      "Vinegar",
      "Ice",
      "Bleach",
      "Powdered Milk"],
      ["Fat",
      "Motor Oil",
      "Wheel Cleaner",
      "Table Salt"],
      ["Racing Fuel",
      "Insect Repellant",
      "Vodka",
      "Baking Soda",
      "Detergent",
      "Food Coloring"],
      ["Drain Opener",
      "Quarters",
      "Glass Cleaner",
      "Nail Polish Remover",
      "Pennies",
      "Pool Cleaner"],
      ["Hexamine",
      "Phenosulfonic Acid",
      "Phenol",
      "Aldehyde Sludge",
      "Formeldahyde",
      "Dinitro"]
    ];

let boardTitles = [
  "TV Station Board",
  "Trailer Park Board",
  "Beach Board",
  "Spawn Room Board",
  "Beachside Market Rear Board",
  "Garage Board"
]

let nonBoardIngredientsList = [
      ["3-methyl-2,4-di-nitrobenzene",
      "3,4-di-nitroxy-methyl-propane",
      "Octa-hydro-2,5-nitro-3,4,7-para-zokine",
      "1,3,5-tera-nitra-phenol"]
    ];

let recipesList = [
      ["Acetaldehyde", "Vodka", "Pennies"],
      ["Glycerol", "Fat", "Vodka"],
      ["Methylbenzene", "Paint", "Drain Opener", "Detergent"],
      ["Nitrated Glycerol Solution", "Mixed Acid", "Glycerol"],
      ["Mixed Acid", "Detergent", "Drain Opener", "Ice"],
      ["Hexamine", "Glass Cleaner", "Formeldahyde"],
      ["Phenosulfonic Acid", "Phenol", "Drain Opener"],
      ["Phenol", "Wheel Cleaner", "Motor Oil", "Insect Repellant"],
      ["Aldehyde Sludge", "Formeldahyde", "Acetaldehyde", "Detergent"],
      ["Formeldahyde", "Racing Fuel", "Quarters"],
      ["Dinitro", "Methylbenzene", "Baking Soda", "Vinegar", "Detergent"],
      ["3-methyl-2,4-di-nitrobenzene", "Dinitro", "Racing Fuel"],
      ["3,4-di-nitroxy-methyl-propane", "Aldehyde Sludge", "Nail Polish Remover"],
      ["Octa-hydro-2,5-nitro-3,4,7-para-zokine", "Detergent", "Hexamine", "Plant Food", "Vinegar"],
      ["1,3,5-tera-nitra-phenol", "Detergent", "Phenosulfonic Acid"]
    ];

export class InitData {
  boards: Board[] = [];
  ingredients: Ingredient[] = [];
  recipes: Recipe[] = [];

  constructor(){
    this.initIngredients(0, boardIngredientsList, true);
    this.initIngredients(boardIngredientsList.length, nonBoardIngredientsList, false);
    this.initRecipes(recipesList);
  }

  initIngredients(startId: number, list: string[][], board: boolean): void {
    if (board && list.length !== boardTitles.length) {
      console.log('board & titles size mismatch');
      return;
    }

    for (let i = 0; i < list.length; i++) {
      let ingredientsToAdd = [];
      for (let j = 0; j < list[i].length; j++) {
        let toAdd = new Ingredient(startId, list[i][j])
        ingredientsToAdd.push(toAdd);
        this.ingredients.push(toAdd);
        startId += 1;
      }
      if (board) {
        this.boards.push(new Board(boardTitles[i], ingredientsToAdd))
      }
    }
  }

  getIngredientByName(name: string): Ingredient {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name === name) {
        return this.ingredients[i];
      }
    }
    console.log('ingredient "' + name + '" not found in array');
    return undefined;
  }

  initRecipes(list: string[][]): void {

    for (let i = 0; i < list.length; i++) {
      let ingredientsToAdd = list[i].slice(1).map((val, index) => {
        return this.getIngredientByName(val);
      });
      this.recipes.push(new Recipe(
        this.getIngredientByName(list[i][0]),
        ingredientsToAdd
      ));
    }
  }
}
