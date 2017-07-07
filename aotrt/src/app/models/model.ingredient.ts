export class Ingredient {
  costa: number;
  costb: number;
  boardItem: boolean;

  constructor(public id: number, public name: string, boardItem?: boolean) {
    this.costa = undefined;
    this.costb = undefined;
    this.boardItem = boardItem == undefined ? true : boardItem;
  }
}