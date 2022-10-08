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
const Tiles_texture_json_1 = __importDefault(require("../../MAIN/DATA/Textures/Tiles.texture.json"));
exports.default = (client, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!ctx.isButton())
        return;
    const session = client.Sessions.get(ctx.user.id);
    if (session) {
        const id = ctx.customId;
        const isPaused = () => {
            if (session.paused) {
                return ctx.followUp("Your game is currently paused!");
            }
        };
        const updateCellBefore = () => {
            if (["floor", "boss"].includes(session.Grid.cell(session.Player.X, session.Player.Y).tier))
                session.Grid.updateCell(session.Player.X, session.Player.Y, { texture: Tiles_texture_json_1.default.tile_floor });
            if (session.Grid.cell(session.Player.X, session.Player.Y).tier === "ladder")
                session.Grid.updateCell(session.Player.X, session.Player.Y, { texture: Tiles_texture_json_1.default.tile_ladders });
            if (session.Grid.cell(session.Player.X, session.Player.Y).tier === "stairs")
                session.Grid.updateCell(session.Player.X, session.Player.Y, { texture: Tiles_texture_json_1.default.tile_stairs });
        };
        const renderAndSend = (grid) => {
            const rendered = session.Views.GridUI.renderGrid(grid);
            const gridEmbed = session.Views.GridUI.makeGridUI(rendered, session);
            const Controls = session.Views.GridUI.GridControlsUI({ PM: session.Player, Grid: session.Grid });
            ctx.update({
                embeds: [gridEmbed],
                components: Controls,
            });
        };
        switch (id) {
            //CONTROLS
            case "CON-DO-ACTION":
                // @ts-ignore
                const emoji = ctx.message.components[1].components[1].data.emoji.name;
                switch (emoji) {
                    case Tiles_texture_json_1.default.tile_stairs:
                        updateCellBefore();
                        session.DungeonManager.goLevelDown(session);
                        session.DungeonManager.changeLevel(session.dungeonLevel, session);
                        const grid = session.Grid.currentGrid;
                        const modifiedGrid = session.Player.put(grid, session.Player.X, session.Player.Y);
                        renderAndSend(modifiedGrid);
                        break;
                    case Tiles_texture_json_1.default.tile_ladders:
                        updateCellBefore();
                        session.DungeonManager.goLevelUp(session);
                        session.DungeonManager.changeLevel(session.dungeonLevel, session);
                        const grid1 = session.Grid.currentGrid;
                        const modifiedGrid1 = session.Player.put(grid1, session.Player.X, session.Player.Y);
                        renderAndSend(modifiedGrid1);
                        break;
                }
                break;
            case 'CON-OPEN-BAG':
                break;
            case "CON-EXIT-DUNGEON":
                break;
            case "CON-MOVE-UP":
                session.Player.movePlayer("up", session.Grid);
                (_a = session.Areas) === null || _a === void 0 ? void 0 : _a.get("LoggingArea").addToLog("move up!");
                renderAndSend(session.Grid.currentGrid);
                break;
            case "CON-MOVE-DOWN":
                session.Player.movePlayer("down", session.Grid);
                (_b = session.Areas) === null || _b === void 0 ? void 0 : _b.get("LoggingArea").addToLog("move down!");
                renderAndSend(session.Grid.currentGrid);
                break;
            case "CON-MOVE-LEFT":
                session.Player.movePlayer("left", session.Grid);
                (_c = session.Areas) === null || _c === void 0 ? void 0 : _c.get("LoggingArea").addToLog("move left!");
                renderAndSend(session.Grid.currentGrid);
                break;
            case "CON-MOVE-RIGHT":
                session.Player.movePlayer("right", session.Grid);
                (_d = session.Areas) === null || _d === void 0 ? void 0 : _d.get("LoggingArea").addToLog("move right!");
                renderAndSend(session.Grid.currentGrid);
                break;
            case 'CON-OPEN-PANEL':
                session.Renderer.changeView("ActionPanel", ctx, session);
                break;
            // ACTION
            case 'ACT-EXIT-PANEL':
                session.Renderer.changeView("GridUI", ctx, session);
                break;
        }
    }
});
