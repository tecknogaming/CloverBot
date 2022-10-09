import { CommandInteraction, Interaction } from "discord.js";
import { CloverClient } from "../MAIN/interfaces";

export default {
    name: "ping",
    description: "checking the bot's latency",
    test: true,
    exec: async (client: CloverClient, ctx: CommandInteraction) => {
        const reply = (str: string) => {ctx.reply(str)}

        reply(`Pong! \`${client.ws.ping}ms\``)
    }
}