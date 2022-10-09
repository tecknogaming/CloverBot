import { CommandInteraction } from "discord.js";
import { CloverClient } from "../../MAIN/interfaces";
import UserManager from "../../MAIN/managers/UserManager";

export default {
    name: "register",
    description: "Register to Clover!",
    test: true,
    exec: (client: CloverClient, ctx: CommandInteraction) => {
        const UM = new UserManager()
        let res = UM.create(ctx.user.id)

        if (!UM.getUserData(ctx.user.id)) {return ctx.reply("You have already signed up!")} else 
        {
            ctx.reply("done! You have signed up!")
        }

    }
}