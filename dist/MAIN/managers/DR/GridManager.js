"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = require("chance");
const Tiles_texture_json_1 = __importDefault(require("../../DATA/Textures/Tiles.texture.json"));
class GridManager {
    constructor() {
        this.LevelsUp = [];
        this.LevelsDown = [];
    }
    makeCurrentGrid(grid) {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentGrid = grid;
            return this.currentGrid;
        });
    }
    create(sizeX, sizeY, amountOfLevelsUp, amountOfLevelsDown) {
        return __awaiter(this, void 0, void 0, function* () {
            this.levelZERO = [];
            this.EnemiesTable = [];
            for (let o = 0; o < amountOfLevelsUp; o++) {
                if (o < amountOfLevelsUp) {
                    this.LevelsUp.push({
                        levelIndex: o + 1,
                        grid: yield this.GEN(sizeX, sizeY, {
                            ladders: 3,
                            stairs: 3
                        })
                    });
                }
                else {
                    this.LevelsUp.push({
                        levelIndex: o + 1,
                        grid: yield this.GEN(sizeX, sizeY, {
                            ladders: 0,
                            stairs: 4
                        })
                    });
                }
            }
            for (let o = 0; o < amountOfLevelsDown; o++) {
                if (o < amountOfLevelsDown) {
                    this.LevelsDown.push({
                        levelIndex: o + 1,
                        grid: yield this.GEN(sizeX, sizeY, {
                            ladders: 3,
                            stairs: 3
                        })
                    });
                }
                else {
                    this.LevelsDown.push({
                        levelIndex: o + 1,
                        grid: yield this.GEN(sizeX, sizeY, {
                            ladders: 4,
                            stairs: 0
                        })
                    });
                }
            }
            this.levelZERO = yield this.GEN(sizeX, sizeY, {
                ladders: 2,
                stairs: 2
            });
            return this.levelZERO;
        });
    }
    GEN(sizeX, sizeY, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const chance = new chance_1.Chance();
            let res = [];
            let cellCount = 1;
            for (let y = 0; y < sizeY + 1; y++) {
                res[y] = [];
                for (let x = 0; x < sizeX + 1; x++) {
                    if (y === 0 && x === 0) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_wall_corner_1,
                            tileIndex: cellCount,
                            tier: "wall"
                        });
                    }
                    else if (y === sizeY && x === sizeX) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_wall_corner_4,
                            tileIndex: cellCount,
                            tier: "wall"
                        });
                    }
                    else if (y === 0 && x === sizeX) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_wall_corner_2,
                            tileIndex: cellCount,
                            tier: "wall"
                        });
                    }
                    else if (y === sizeY && x === 0) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_wall_corner_3,
                            tileIndex: cellCount,
                            tier: "wall"
                        });
                    }
                    else if (y === 0 || y === sizeY) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_wall,
                            tileIndex: cellCount,
                            tier: "wall"
                        });
                    }
                    else if (x === 0 || x === sizeX) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_wall,
                            tileIndex: cellCount,
                            tier: "wall"
                        });
                    }
                    else if (options.stairs > 0 && y < sizeY - 2 && chance.bool({ likelihood: 5 })) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_stairs,
                            tileIndex: cellCount,
                            tier: "stairs"
                        });
                        options.stairs--;
                    }
                    else if (options.ladders > 0 && y < sizeY - 1 && chance.bool({ likelihood: 3 })) {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_ladders,
                            tileIndex: cellCount,
                            tier: "ladder"
                        });
                        options.ladders--;
                    }
                    else {
                        res[y].push({
                            texture: Tiles_texture_json_1.default.tile_floor,
                            tileIndex: cellCount,
                            tier: "floor"
                        });
                    }
                    cellCount++;
                }
            }
            return res;
        });
    }
    cell(cellX, cellY) {
        return this.currentGrid[cellY][cellX];
    }
    updateCell(cellX, cellY, newCellData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newCellData.texture)
                this.currentGrid[cellY][cellX].texture = newCellData.texture;
            if (newCellData.tier)
                this.currentGrid[cellY][cellX].tier = newCellData.tier;
            return this.currentGrid[cellY][cellX];
        });
    }
}
exports.default = GridManager;
