import { Interaction } from "discord.js"
import CloverClient from "../../MAIN/CloverClient"
import tileTexture from "../../MAIN/DATA/Textures/Tiles.texture.json"
import { DRtile } from "../../MAIN/types"

export default async (client: CloverClient, ctx: Interaction) => {
    if (!ctx.isButton()) return

    const session = client.Sessions.get(ctx.user.id);

    

    if (session) {
        const id = ctx.customId

        const isPaused = () => {
            if (session.paused) {
                return ctx.followUp("Your game is currently paused!")
            }
        }

        const updateCellBefore = () => {
            if (["floor", "boss"].includes(session.Grid.cell(session.Player.X,session.Player.Y).tier)) session.Grid.updateCell(session.Player.X, session.Player.Y, { texture: tileTexture.tile_floor })
            if (session.Grid.cell(session.Player.X,session.Player.Y).tier === "ladder") session.Grid.updateCell(session.Player.X, session.Player.Y, { texture: tileTexture.tile_ladders })
            if (session.Grid.cell(session.Player.X,session.Player.Y).tier === "stairs") session.Grid.updateCell(session.Player.X, session.Player.Y, { texture: tileTexture.tile_stairs })
        }

        const renderAndSend = (grid: DRtile[][]) => {
            const rendered = session.Views.GridUI.renderGrid(grid)
            const gridEmbed = session.Views.GridUI.makeGridUI(rendered, session)
            const Controls = session.Views.GridUI.GridControlsUI({ PM: session.Player, Grid: session.Grid })
            
            ctx.update({
                embeds: [gridEmbed],
                components: Controls,
            })
        }

        switch(id) {

            //CONTROLS
            case "CON-DO-ACTION":
                // @ts-ignore
                const emoji = ctx.message.components[1].components[1].data.emoji.name

                switch (emoji) {
                    case tileTexture.tile_stairs: 
                        updateCellBefore()
                        session.DungeonManager.goLevelDown(session)
                        session.DungeonManager.changeLevel(session.dungeonLevel, session)
                        const grid = session.Grid.currentGrid
                        const modifiedGrid = session.Player.put(grid, session.Player.X, session.Player.Y)

                        renderAndSend(modifiedGrid)
                        break;
                    
                    case tileTexture.tile_ladders:
                        updateCellBefore()
                        session.DungeonManager.goLevelUp(session)
                        session.DungeonManager.changeLevel(session.dungeonLevel, session)
                        const grid1 = session.Grid.currentGrid
                        const modifiedGrid1 = session.Player.put(grid1, session.Player.X, session.Player.Y)

                        renderAndSend(modifiedGrid1)
                        break;
                }
                break;

            case 'CON-OPEN-BAG':
                break;

            case "CON-EXIT-DUNGEON":

                break;



            case "CON-MOVE-UP":
                session.Player.movePlayer("up", session.Grid)
                session.Areas?.get("LoggingArea").addToLog("move up!")
                renderAndSend(session.Grid.currentGrid)
                break;
    
            case "CON-MOVE-DOWN":
                session.Player.movePlayer("down", session.Grid)
                session.Areas?.get("LoggingArea").addToLog("move down!")
                renderAndSend(session.Grid.currentGrid)
                break;
            
            case "CON-MOVE-LEFT":
                session.Player.movePlayer("left", session.Grid)
                session.Areas?.get("LoggingArea").addToLog("move left!")
                renderAndSend(session.Grid.currentGrid)
                break;
            
            case "CON-MOVE-RIGHT":
                session.Player.movePlayer("right", session.Grid)
                session.Areas?.get("LoggingArea").addToLog("move right!")
                renderAndSend(session.Grid.currentGrid)
                break;

            case 'CON-OPEN-PANEL':
                session.Renderer.changeView("ActionPanel", ctx, session)
                break;




            // ACTION
            case 'ACT-EXIT-PANEL':
                session.Renderer.changeView("GridUI", ctx, session)
                break;
        }
    }
}