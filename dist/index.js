"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CloverClient_1 = __importDefault(require("./MAIN/CloverClient"));
//@ts-ignore
const bot = new CloverClient_1.default((_a = process.env.DISCORD_BOT_TOKEN) === null || _a === void 0 ? void 0 : _a.toString(), {
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "MessageContent",
        "DirectMessages",
    ],
    partials: [
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.User,
        discord_js_1.Partials.GuildMember,
        discord_js_1.Partials.Message
    ]
}, {
    commandsFolder: "commands",
    eventsFolder: "events"
});
bot.init();
