"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionPanel = void 0;
const discord_js_1 = require("discord.js");
const Renderer_1 = __importDefault(require("../Renderer"));
class ActionPanel extends Renderer_1.default {
    constructor() {
        super();
    }
    Panel(session) {
        const embed = this.makeUIembed("PANEL", {
            title: "Action Menu!",
            description: "",
            footer: {
                text: "Panel"
            }
        });
        embed.setColor("Aqua");
        embed.setFields({
            name: "Player",
            value: `Health: \`${session.Stats.HP}\`\n` +
                `\n` +
                `Level: \`${session.level}\`\n` +
                `EXP: \`${session.exp}\``
        });
        return embed;
    }
    ActionButtons() {
        const rows = [
            new discord_js_1.ActionRowBuilder()
                .addComponents(this.makeUIbutton("ACT-EXIT-PANEL", new discord_js_1.ButtonBuilder()
                .setEmoji("❌")
                .setStyle(discord_js_1.ButtonStyle.Secondary)))
        ];
        return rows;
    }
}
exports.ActionPanel = ActionPanel;
