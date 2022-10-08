"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridUI = void 0;
const discord_js_1 = require("discord.js");
const Renderer_1 = __importDefault(require("../Renderer"));
const Tiles_texture_json_1 = __importDefault(require("../../../DATA/Textures/Tiles.texture.json"));
class GridUI extends Renderer_1.default {
    constructor() {
        super();
    }
    renderGrid(gridData, postProcessing) {
        const res = [];
        for (let y = 0; y < gridData.length; y++) {
            for (let x = 0; x < gridData[y].length; x++) {
                const cell = gridData[y][x];
                res.push(cell.texture);
            }
            res.push("\n");
        }
        if (postProcessing)
            postProcessing(res);
        return res.join('');
    }
    makeGridUI(grid, session) {
        var _a;
        const embed = this.makeUIembed("GridUI", {
            description: ((_a = session.Areas) === null || _a === void 0 ? void 0 : _a.get("LoggingArea").render()) + '\n' + grid,
            footer: {
                text: require("../../../../../Clover.config.json").version
            }
        });
        return embed;
    }
    GridControlsUI({ PM, Grid }) {
        const buttonEmojis = require("../../../DATA/Textures/Buttons.texture.json");
        const rows = [
            new discord_js_1.ActionRowBuilder()
                .addComponents(this.makeUIbutton("CON-EXIT-DUNGEON", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.button_exit_dungeon)
                .setStyle(discord_js_1.ButtonStyle.Danger)), this.makeUIbutton("CON-MOVE-UP", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.buttom_move_up)
                .setStyle(discord_js_1.ButtonStyle.Primary)), this.makeUIbutton("CON-PAUSE", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.button_pause)
                .setStyle(discord_js_1.ButtonStyle.Secondary))),
            new discord_js_1.ActionRowBuilder()
                .addComponents(this.makeUIbutton("CON-MOVE-LEFT", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.buttom_move_left)
                .setStyle(discord_js_1.ButtonStyle.Primary)), this.makeUIbutton("CON-DO-ACTION", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.button_action_default)
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setDisabled(true)), this.makeUIbutton("CON-MOVE-RIGHT", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.buttom_move_right)
                .setStyle(discord_js_1.ButtonStyle.Primary))),
            new discord_js_1.ActionRowBuilder()
                .addComponents(this.makeUIbutton("CON-OPEN-PANEL", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.button_open_panel)
                .setStyle(discord_js_1.ButtonStyle.Success)), this.makeUIbutton("CON-MOVE-DOWN", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.buttom_move_down)
                .setStyle(discord_js_1.ButtonStyle.Primary)), this.makeUIbutton("CON-OPEN-BAG", new discord_js_1.ButtonBuilder()
                .setEmoji(buttonEmojis.button_open_bag)
                .setStyle(discord_js_1.ButtonStyle.Success)))
        ];
        const currentGrid = Grid.currentGrid;
        const currentTile = currentGrid[PM.Y][PM.X];
        const AMV = PM.checkAvailableMoves(currentGrid);
        switch (currentTile.tier) {
            case 'stairs':
                rows[1].components[1].setEmoji(Tiles_texture_json_1.default.tile_stairs);
                rows[1].components[1].setDisabled(false);
                break;
            case 'ladder':
                rows[1].components[1].setEmoji(Tiles_texture_json_1.default.tile_ladders);
                rows[1].components[1].setDisabled(false);
                break;
        }
        if (!AMV.up)
            rows[0].components[1].setDisabled(true);
        if (!AMV.down)
            rows[2].components[1].setDisabled(true);
        if (!AMV.left)
            rows[1].components[0].setDisabled(true);
        if (!AMV.right)
            rows[1].components[2].setDisabled(true);
        return rows;
    }
}
exports.GridUI = GridUI;
