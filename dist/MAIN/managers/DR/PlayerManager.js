"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tiles_texture_json_1 = __importDefault(require("../../DATA/Textures/Tiles.texture.json"));
class PlayerManager {
    constructor(uid, opts) {
        this.X = opts.startX;
        this.Y = opts.startY;
    }
    put(grid, x, y) {
        grid[y ? y : this.Y][x ? x : this.X].texture = Tiles_texture_json_1.default.tile_player;
        return grid;
    }
    checkAvailableMoves(grid) {
        let up = true;
        let down = true;
        let left = true;
        let right = true;
        if (grid[this.Y - 1][this.X].tier === "wall")
            up = false;
        if (grid[this.Y + 1][this.X].tier === "wall")
            down = false;
        if (grid[this.Y][this.X - 1].tier === "wall")
            left = false;
        if (grid[this.Y][this.X + 1].tier === "wall")
            right = false;
        return { up, down, left, right };
    }
    movePlayer(direction, GM) {
        const tex = require("../../DATA/Textures/Tiles.texture.json");
        const updateCellBefore = () => {
            if (["floor", "boss"].includes(GM.cell(this.X, this.Y).tier))
                GM.updateCell(this.X, this.Y, { texture: tex.tile_floor });
            if (GM.cell(this.X, this.Y).tier === "ladder")
                GM.updateCell(this.X, this.Y, { texture: tex.tile_ladders });
            if (GM.cell(this.X, this.Y).tier === "stairs")
                GM.updateCell(this.X, this.Y, { texture: tex.tile_stairs });
        };
        switch (direction) {
            case 'up':
                updateCellBefore();
                this.Y--;
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player });
                break;
            case 'down':
                updateCellBefore();
                this.Y++;
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player });
                break;
            case 'left':
                updateCellBefore();
                this.X--;
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player });
                break;
            case 'right':
                updateCellBefore();
                this.X++;
                GM.updateCell(this.X, this.Y, { texture: tex.tile_player });
                break;
        }
    }
}
exports.default = PlayerManager;
