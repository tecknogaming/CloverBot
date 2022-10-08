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
const discord_js_1 = require("discord.js");
const GridManager_1 = __importDefault(require("./GridManager"));
const PlayerManager_1 = __importDefault(require("./PlayerManager"));
const Renderer_1 = __importDefault(require("./Renderer"));
const ActionPanel_1 = require("./Views/ActionPanel");
const GridUI_1 = require("./Views/GridUI");
class DungeonRunner {
    constructor(uid, playerData) {
        this.gridSize = 10;
        this.UID = uid;
        this.PLAYER_DATA = playerData;
    }
    initSession(client) {
        var _a;
        const session = {
            uId: this.UID,
            sessionId: this.genSessionId(10),
            exp: this.PLAYER_DATA.exp,
            level: this.PLAYER_DATA.level,
            Inventory: this.PLAYER_DATA.inventory,
            Stats: this.PLAYER_DATA.stats,
            basicAttack: this.PLAYER_DATA.basicAttack,
            specialAttacks: this.PLAYER_DATA.specialAttacks,
            dungeonLevel: 0,
            DungeonManager: this,
            Grid: new GridManager_1.default(),
            Renderer: new Renderer_1.default(),
            Player: new PlayerManager_1.default(this.UID, {
                startX: Math.round(this.gridSize / 2),
                startY: this.gridSize - 1
            }),
            Areas: new discord_js_1.Collection(),
            Views: {
                GridUI: new GridUI_1.GridUI(),
                ActionPanel: new ActionPanel_1.ActionPanel()
            }
        };
        // console.log(session)
        session.Renderer.createLoggingArea(session);
        (_a = session.Areas) === null || _a === void 0 ? void 0 : _a.get("LoggingArea").addToLog("You have entered a dungeon!");
        this.SESSION = session;
        client.Sessions.set(this.UID, this.SESSION);
        return session;
    }
    startRun(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.SESSION) {
                return "SESSION IS NOT YET INITIALIZE";
            }
            //generate grid data and format it
            const gridData = yield this.SESSION.Grid.create(this.gridSize, this.gridSize, 3, 3);
            const modifiedGridData = this.SESSION.Player.put(gridData);
            const grid = yield this.SESSION.Grid.makeCurrentGrid(modifiedGridData);
            const gridRender = this.SESSION.Views.GridUI.renderGrid(grid);
            //generate the ui
            const gridEmbed = this.SESSION.Views.GridUI.makeGridUI(gridRender, this.SESSION);
            const Controls = this.SESSION.Views.GridUI.GridControlsUI({ PM: this.SESSION.Player, Grid: this.SESSION.Grid });
            ctx.reply({
                embeds: [gridEmbed],
                components: Controls,
                ephemeral: true
            });
            return true;
        });
    }
    changeLevel(level, session) {
        if (level === 0) {
            session.Grid.makeCurrentGrid(session.Grid.levelZERO);
        }
        else if (level > 0) {
            session.Grid.makeCurrentGrid(session.Grid.LevelsUp[level].grid);
        }
        else if (level < 0) {
            session.Grid.makeCurrentGrid(session.Grid.LevelsUp[Number(String(level)[1])].grid);
        }
        return session.Grid.currentGrid;
    }
    goLevelUp(session) {
        session.dungeonLevel++;
    }
    goLevelDown(session) {
        session.dungeonLevel--;
    }
    endRun() {
        return true;
    }
    pauseRun() {
        return true;
    }
    genSessionId(L) {
        let ID = "";
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYNZ-_+?@$&%^!#=+|";
        for (let i = 0; i < L; i++) {
            ID += chars[Math.floor(Math.random() * chars.length)];
        }
        return ID;
    }
}
exports.default = DungeonRunner;
