"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const events_1 = __importDefault(require("events"));
const LoggingArea_1 = __importDefault(require("./AreaComponents/LoggingArea"));
class Renderer extends events_1.default {
    constructor() {
        super();
        this.EmbedList = {};
        this.ButtonList = {};
        this.ActionRowList = {};
    }
    changeView(view, ctx, session) {
        let embed;
        let components;
        switch (view) {
            case 'ActionPanel':
                embed = session.Views.ActionPanel.Panel(session);
                components = session.Views.ActionPanel.ActionButtons();
                ctx.update({
                    embeds: [embed],
                    components
                });
                break;
            case 'GridUI':
                const rendered = session.Views.GridUI.renderGrid(session.Grid.currentGrid);
                embed = session.Views.GridUI.makeGridUI(rendered, session);
                components = session.Views.GridUI.GridControlsUI({ PM: session.Player, Grid: session.Grid });
                ctx.update({
                    embeds: [embed],
                    components
                });
                break;
        }
    }
    createLoggingArea(session) {
        var _a, _b;
        const LA = new LoggingArea_1.default();
        (_a = session.Areas) === null || _a === void 0 ? void 0 : _a.set(LA.id, LA);
        return (_b = session.Areas) === null || _b === void 0 ? void 0 : _b.get(LA.id);
    }
    makeUIbutton(buttonID, builder) {
        builder.setCustomId(buttonID);
        //@ts-ignore
        this.ButtonList[buttonID] = builder;
        this.emit("buttonCreate", buttonID, builder);
        return builder;
    }
    makeUIembed(embedID, opts) {
        var _a, _b;
        if (opts.footer)
            opts.footer.text = ((_a = opts.footer) === null || _a === void 0 ? void 0 : _a.text) ? ((_b = opts.footer) === null || _b === void 0 ? void 0 : _b.text) + " | Clover" : "";
        const em = new discord_js_1.EmbedBuilder()
            .setTitle(opts.title ? opts.title : " ")
            .setDescription(opts.description ? opts.description : " ")
            .setFooter(opts.footer ? opts.footer : { text: " " });
        // @ts-ignore
        this.EmbedList[embedID] = em;
        this.emit("embedCreate", embedID, em);
        // @ts-ignore
        return this.EmbedList[embedID];
    }
}
exports.default = Renderer;
