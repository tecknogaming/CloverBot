import { Item } from "../types";

export let Item_Dictionary: Item[] = []

export function add(data: Item) {
    Item_Dictionary.push(data)
}