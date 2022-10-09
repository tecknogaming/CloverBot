import { Item, Weapon } from "../../types";

export class InventoryManager {
    public declare INVENTORY: Item[]
    public declare MainWeapon: Weapon
    public declare SecondaryWeapon: Weapon

    constructor() {}

    addItem(item: Item) {
        const newItem = this.INVENTORY.push(item)
    }

    removeItem(index: number) {
        const removed = this.INVENTORY.slice(index, index)
    }
}