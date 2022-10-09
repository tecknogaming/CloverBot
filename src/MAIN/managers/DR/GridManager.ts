import { Chance } from "chance"
import { DRenemy, DRGridArray, DRlevel, DRtile, DRtileTier } from "../../types"
import tex from "../../DATA/Textures/Tiles.texture.json"

export default class GridManager {
    public declare currentGrid: DRtile[][]
    public declare levelZERO: DRtile[][]
    public declare EnemiesTable: DRenemy[]
    public declare LevelsUp: DRlevel[]
    public declare LevelsDown: DRlevel[]
    constructor () {
        this.LevelsUp = []
        this.LevelsDown = []
    }

    async makeCurrentGrid(grid: DRGridArray) {
        this.currentGrid = grid

        return this.currentGrid
    }

    async create(sizeX: number, sizeY: number, amountOfLevelsUp: number, amountOfLevelsDown: number) {
        this.levelZERO = []
        this.EnemiesTable = []
        
        for (let o = 0; o < amountOfLevelsUp; o++) {
            if (o < amountOfLevelsUp) {
                this.LevelsUp.push({
                    levelIndex: o + 1,
                    grid: await this.GEN(sizeX, sizeY, {
                        ladders: 3,
                        stairs: 3
                    })
                })
            } else {
                this.LevelsUp.push({
                    levelIndex: o + 1,
                    grid: await this.GEN(sizeX, sizeY, {
                        ladders: 0,
                        stairs: 4
                    })
                })
            }
        }

        for (let o = 0; o < amountOfLevelsDown; o++) {
            if(o < amountOfLevelsDown) {
                this.LevelsDown.push({
                    levelIndex: o + 1,
                    grid: await this.GEN(sizeX, sizeY, {
                        ladders: 3,
                        stairs: 3
                    })
                })
            } else {
                this.LevelsDown.push({
                    levelIndex: o + 1,
                    grid: await this.GEN(sizeX, sizeY, {
                        ladders: 4,
                        stairs: 0
                    })
                })
            }
        }

        this.levelZERO = await this.GEN(sizeX, sizeY, {
            ladders: 2,
            stairs: 2
        })

        return this.levelZERO
    }

    private async GEN(sizeX: number, sizeY: number, options: {
        ladders: number
        stairs: number
    }) {
        const chance = new Chance()

        let res: DRtile[][] = []

        let cellCount = 1

        for (let y = 0; y < sizeY + 1; y++) {
            res[y] = []
            for (let x = 0; x < sizeX + 1; x++) {

                if (y === 0 && x === 0) {
                    res[y].push({
                        texture: tex.tile_wall_corner_1,
                        tileIndex: cellCount,
                        tier: "wall"
                    })
                } else if (y === sizeY && x === sizeX) {
                    res[y].push({
                        texture: tex.tile_wall_corner_4,
                        tileIndex: cellCount,
                        tier: "wall"
                    })
                } else if (y === 0 && x === sizeX) {
                    res[y].push({
                        texture: tex.tile_wall_corner_2,
                        tileIndex: cellCount,
                        tier: "wall"
                    })
                } else if (y === sizeY && x === 0) {
                    res[y].push({
                        texture: tex.tile_wall_corner_3,
                        tileIndex: cellCount,
                        tier: "wall"
                    })
                } else



                if (y === 0 || y === sizeY) {
                    res[y].push({
                        texture: tex.tile_wall,
                        tileIndex: cellCount,
                        tier: "wall"
                    })
                } else if (x === 0 || x === sizeX) {
                    res[y].push({
                        texture: tex.tile_wall,
                        tileIndex: cellCount,
                        tier: "wall"
                    })
                } else if (options.stairs > 0 && y < sizeY - 2 && chance.bool({ likelihood: 5 })) {
                    res[y].push({
                        texture: tex.tile_stairs,
                        tileIndex: cellCount,
                        tier: "stairs"
                    })
                    options.stairs--
                } else if (options.ladders > 0 && y < sizeY - 1 && chance.bool({ likelihood: 3 })) {
                    res[y].push({
                        texture: tex.tile_ladders,
                        tileIndex: cellCount,
                        tier: "ladder"
                    })
                    options.ladders--
                } else {
                    res[y].push({
                        texture: tex.tile_floor,
                        tileIndex: cellCount,
                        tier: "floor"
                    })
                }

                cellCount++
            }
        }

        return res
    }

    cell(cellX: number, cellY: number) {
        return this.currentGrid[cellY][cellX]
    }

    async updateCell(cellX: number, cellY: number, newCellData: {
        texture?: string
        tier?: DRtileTier
    }) {
        if (newCellData.texture) this.currentGrid[cellY][cellX].texture = newCellData.texture
        if (newCellData.tier) this.currentGrid[cellY][cellX].tier = newCellData.tier

        return this.currentGrid[cellY][cellX]
    }
}