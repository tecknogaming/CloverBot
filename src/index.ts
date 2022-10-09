import { Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config()

import CloverClient from "./MAIN/CloverClient";

//@ts-ignore
const bot = new CloverClient(process.env.DISCORD_BOT_TOKEN?.toString(), {
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "MessageContent",
        "DirectMessages",
    ],
    partials: [
        Partials.Channel,
        Partials.User,
        Partials.GuildMember,
        Partials.Message
    ]
}, {
    commandsFolder: "commands",
    eventsFolder: "events"
})

bot.init()