import { Collection, CommandInteraction } from "discord.js";
import CloverClient from "../../CloverClient";
import { CloverUser, DRsession } from "../../types";
import GridManager from "./GridManager";
import PlayerManager from "./PlayerManager";
import Renderer from "./Renderer";
import { ActionPanel } from "./Views/ActionPanel";
import { GridUI } from "./Views/GridUI";

export default class DungeonRunner {
    private UID: string
    declare public PLAYER_DATA: CloverUser
    declare public SESSION: DRsession

    private gridSize = 10

    constructor(uid: string, playerData: CloverUser) {
        this.UID = uid
        this.PLAYER_DATA = playerData
    }

    initSession(client: CloverClient) {
        const session: DRsession = {
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
            Grid: new GridManager(),
            Renderer: new Renderer(),
            Player: new PlayerManager(this.UID, {
                startX: Math.round(this.gridSize / 2),
                startY: this.gridSize - 1
            }),

            Areas: new Collection(),
            Views: {
                GridUI: new GridUI(),
                ActionPanel: new ActionPanel()
            }
        }

        // console.log(session)

        session.Renderer.createLoggingArea(session)
        session.Areas?.get("LoggingArea").addToLog("You have entered a dungeon!")
        this.SESSION = session
        client.Sessions.set(this.UID, this.SESSION)

        return session
    }

    async startRun(ctx: CommandInteraction) {
        if (!this.SESSION) { return "SESSION IS NOT YET INITIALIZE" }

        //generate grid data and format it
        const gridData = await this.SESSION.Grid.create(this.gridSize, this.gridSize, 3, 3)
        const modifiedGridData = this.SESSION.Player.put(gridData)
        const grid = await this.SESSION.Grid.makeCurrentGrid(modifiedGridData)
        const gridRender = this.SESSION.Views.GridUI.renderGrid(grid) 

        //generate the ui
        const gridEmbed = this.SESSION.Views.GridUI.makeGridUI(gridRender, this.SESSION)
        const Controls = this.SESSION.Views.GridUI.GridControlsUI({ PM: this.SESSION.Player, Grid: this.SESSION.Grid })

        ctx.reply({
            embeds: [gridEmbed],
            components: Controls,
            ephemeral: true
        })

        return true
    }

    changeLevel(level: number, session: DRsession) {
        if (level === 0) {
            session.Grid.makeCurrentGrid(session.Grid.levelZERO)
        } else if (level > 0) {
            session.Grid.makeCurrentGrid(session.Grid.LevelsUp[level].grid)
        } else if (level < 0) {
            session.Grid.makeCurrentGrid(session.Grid.LevelsUp[Number(String(level)[1])].grid)
        }

        return session.Grid.currentGrid
    }

    goLevelUp(session: DRsession) {
        session.dungeonLevel++
    }

    goLevelDown(session: DRsession) {
        session.dungeonLevel--
    }

    endRun() {
        return true
    }

    pauseRun() {
        return true
    }

    private genSessionId(L:number): string {
        let ID: string = ""

        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYNZ-_+?@$&%^!#=+|"

        for (let i = 0; i < L; i++) {
            ID += chars[Math.floor(Math.random() * chars.length)];
        }

        return ID
    }
}