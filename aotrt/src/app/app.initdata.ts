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
      ["Octa-hydro-2,5-nitro-3,4,7-para-zokine", "Formeldahyde", "Hexamine"],
      ["1,3,5-tera-nitra-phenol", "Detergent", "Phenosulfonic Acid"]
    ];

export class InitData {
    
  static ingredients(): Ingredient[][] {
    let result = boardIngredientsList.map((outerVal, outerIdx) => {
      return outerVal.map((val, idx) => {
        return new Ingredient(0, val);
      });
    });

    result = result.concat(nonBoardIngredientsList.map((outerVal, outerIdx) => {
      return outerVal.map((val, idx) => {
        return new Ingredient(0, val, false);
      });
    }));

    return result;
  }

  static getIngredientByName(name: string, ingredients: Ingredient[][]): Ingredient {
    for (let i = 0; i < ingredients.length; i++) {
      for (let j = 0; j < ingredients[i].length; j++) {
        if (ingredients[i][j].name === name) {
          return ingredients[i][j];
        }
      }
    }
    console.log('ingredient "' + name + '" not found in array');
    return undefined;
  }

  static recipes(ings: Ingredient[][]): Recipe[] {
    let result = [];   

    for (let i = 0; i < recipesList.length; i++) {
      let ingredientsToAdd = recipesList[i].slice(1).map((val, index) => {
        return InitData.getIngredientByName(val, ings);
      });
      result = result.concat(new Recipe(
        InitData.getIngredientByName(recipesList[i][0], ings),
        ingredientsToAdd
      ));
    }

    return result;
  }
}
