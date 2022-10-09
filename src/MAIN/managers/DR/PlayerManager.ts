import { DRtile } from "../../types"
import tex from "../../DATA/Textures/Tiles.texture.json"
import GridManager from "./GridManager"
import { InventoryManager } from "./InventoryManager"

export default class PlayerManager {
    declare public X: number
    declare public Y: number
    declare public inventory: InventoryManager

    constructor(uid: string, opts: {
        startX: number
        startY: number
    }) {
        this.X = opts.startX
        this.Y = opts.startY
        this.inventory = new InventoryManager();
    }

    put (grid: DRtile[][], x?: number, y?: number) {
        grid[y ? y : this.Y][x ? x : this.X].texture = tex.tile_player
        return grid
    }

    checkAvailableMoves(grid: DRtile[][]) {
        let up: boolean = true
        let down: boolean = true
        let left: boolean = true
        let right: boolean = true

        if (grid[this.Y - 1][this.X].tier === "wall") up = false
        if (grid[this.Y + 1][this.X].tier === "wall") down = false
        if (grid[this.Y][this.X - 1].tier === "wall") left = false
        if (grid[this.Y][this.X + 1].tier === "wall") right = false

        return {up, down, left, right}
    }

    movePlayer(direction: "up" | "down" | "left" | "right", GM: GridManager) {
        const tex = require("../../DATA/Textures/Tiles.texture.json")

        const updateCellBefore = () => {
            if (["floor", "boss"].includes(GM.cell(this.X,this.Y).tier)) GM.updateCell(this.X, this.Y, { texture: tex.tile_floor })
                if (GM.cell(this.X,this.Y).tier === "ladder") GM.updateCell(this.X, this.Y, { texture: tex.tile_ladders })
                if (GM.cell(this.X,this.Y).tier === "stairs") GM.updateCell(this.X, this.Y, { texture: tex.tile_stairs })
        }

        switch(direction) {
            case 'up':
                updateCellBefore()
                this.Y--
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player })
                break;
            
            case 'down':
                updateCellBefore()
                this.Y++
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player })
                break;
            
            case 'left':
                updateCellBefore()
                this.X--
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player })
                break;
            
            case 'right':
                updateCellBefore()
                this.X++
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player })
                break;
        }
    }
}