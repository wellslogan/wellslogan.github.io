import { Ingredient } from './model.ingredient';

export class Board {
    visible: boolean;

    constructor(public title: string, public ingredients: Ingredient[], visible?: boolean) {
        this.visible = visible == undefined ? true : visible; 
    }

}