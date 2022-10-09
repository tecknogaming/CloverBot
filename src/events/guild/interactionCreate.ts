import { Interaction } from "discord.js"
import { CloverClient } from "../../MAIN/interfaces"

export default (client: CloverClient, ctx: Interaction) => {
    if (!ctx.isChatInputCommand()) return

    let cmd = client.commands.get(ctx.commandName);
    if (ctx && cmd) {
        try {
            cmd.exec(client, ctx)
        } catch (e) {
            ctx.reply({content: "ERROR | Failed to excute command!\n```" + e + "```", ephemeral: true})
            console.log(e)
        }
    } else {
        ctx.reply("404 | Command Not Found!")
    }
}