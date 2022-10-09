import { DRenemy } from "../types"

export let Item_Dictionary: DRenemy[] = []

export function add(data: DRenemy) {
    Item_Dictionary.push(data)
}