import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { DRsession, DRtile } from "../../../types";
import GridManager from "../GridManager";
import PlayerManager from "../PlayerManager";
import Renderer from "../Renderer";
import tileTex from "../../../DATA/Textures/Tiles.texture.json"

export class GridUI extends Renderer {
    constructor() {
        super()
    }

    renderGrid(gridData: DRtile[][], postProcessing?: Function) {
        const res: string[] = []

        for(let y = 0; y < gridData.length; y++) {
            for (let x = 0; x < gridData[y].length; x++) {
                const cell = gridData[y][x]

                res.push(cell.texture)
            }

            res.push("\n")
        }

        if (postProcessing) postProcessing(res);

        return res.join('')
    }

    makeGridUI(grid: string, session: DRsession) {
        const embed = this.makeUIembed("GridUI", {
            description: session.Areas?.get("LoggingArea").render() + '\n' + grid,
            footer: {
                text: require("../../../../../Clover.config.json").version
            }
        })
        return embed
    }

    GridControlsUI({ PM, Grid }: { PM: PlayerManager; Grid: GridManager; }) {
        const buttonEmojis = require("../../../DATA/Textures/Buttons.texture.json")
        const rows = [
            new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    this.makeUIbutton("CON-EXIT-DUNGEON", 
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.button_exit_dungeon)
                        .setStyle(ButtonStyle.Danger)
                    ),

                    this.makeUIbutton("CON-MOVE-UP", 
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.buttom_move_up)
                        .setStyle(ButtonStyle.Primary)
                    ),
                    
                    this.makeUIbutton("CON-PAUSE",
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.button_pause)
                        .setStyle(ButtonStyle.Secondary)
                    )
                    
                ),
            
            new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    this.makeUIbutton("CON-MOVE-LEFT", 
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.buttom_move_left)
                        .setStyle(ButtonStyle.Primary)
                    ),
                    
                    this.makeUIbutton("CON-DO-ACTION",
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.button_action_default)
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)
                    ),
                    
                    this.makeUIbutton("CON-MOVE-RIGHT",
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.buttom_move_right)
                        .setStyle(ButtonStyle.Primary)
                    )                    
                ),
            
            new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    this.makeUIbutton("CON-OPEN-PANEL", 
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.button_open_panel)
                        .setStyle(ButtonStyle.Success)
                    ),

                    this.makeUIbutton("CON-MOVE-DOWN",
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.buttom_move_down)
                        .setStyle(ButtonStyle.Primary)
                    ),

                    this.makeUIbutton("CON-OPEN-BAG",
                        new ButtonBuilder()
                        .setEmoji(buttonEmojis.button_open_bag)
                        .setStyle(ButtonStyle.Success)
                    ),
                )
        ]

        const currentGrid = Grid.currentGrid
        const currentTile = currentGrid[PM.Y][PM.X]

        const AMV = PM.checkAvailableMoves(currentGrid)

        switch (currentTile.tier) {
            case 'stairs':
                rows[1].components[1].setEmoji(tileTex.tile_stairs)
                rows[1].components[1].setDisabled(false)
                break;
            
            case 'ladder':
                rows[1].components[1].setEmoji(tileTex.tile_ladders)
                rows[1].components[1].setDisabled(false)
                break;
        }

        if (!AMV.up) rows[0].components[1].setDisabled(true)
        if (!AMV.down) rows[2].components[1].setDisabled(true)
        if (!AMV.left) rows[1].components[0].setDisabled(true)
        if (!AMV.right) rows[1].components[2].setDisabled(true)

        return rows
            
    }
}