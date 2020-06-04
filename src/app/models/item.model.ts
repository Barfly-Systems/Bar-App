export class Item {
    itemId: number;
    itemName: string;
    itemSize: string;
    itemCost: number;
    itemModifier: string[];
    itemExtras: Item[]
    itemIsExtra: boolean;
    itemLocation: number;

    constructor(
        itemId:number,
        itemName: string,
        itemSize: string,
        itemCost: number,
        itemModifier: string[],
        itemExtras: Item[],
        itemIsExtra: boolean,
        itemLocation: number
    )
    {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemSize = itemSize;
        this.itemCost = itemCost;
        this.itemModifier = itemModifier;
        this.itemExtras = itemExtras;
        this.itemIsExtra = itemIsExtra;
        this.itemLocation = itemLocation;
    }
}
