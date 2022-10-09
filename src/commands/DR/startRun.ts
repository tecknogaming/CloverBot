import { CommandInteraction } from "discord.js";
import CloverClient from "../../MAIN/CloverClient";
import DungeonRunner from "../../MAIN/managers/DR/DungeonRunner";
import UserManager from "../../MAIN/managers/UserManager";
import UserSchema from "../../MAIN/Schemas/UserSchema";

export default {
    name: "start",
    description: "Start a dungeon run!",
    test: true,
    exec: async (client: CloverClient, ctx: CommandInteraction) => {

        const UM = new UserManager()
        const data = await UM.getUserData(ctx.user.id)

        // console.log(data)

        //@ts-ignore
        const DR = new DungeonRunner(ctx.user.id, data)

        DR.initSession(client)
        DR.startRun(ctx)            

    }
}