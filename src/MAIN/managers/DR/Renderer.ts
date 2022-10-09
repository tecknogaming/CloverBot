import { ButtonBuilder, ButtonInteraction, EmbedBuilder, EmbedFooterOptions } from "discord.js";
import EventEmitter from "events";
import { DRsession } from "../../types";
import LoggingArea from "./AreaComponents/LoggingArea";

export default class Renderer extends EventEmitter {
    public declare EmbedList: Object
    public declare ButtonList: Object
    public declare ActionRowList: Object

    constructor() {
        super()
        this.EmbedList = {}
        this.ButtonList = {}
        this.ActionRowList = {}
    }

    changeView(view: "ActionPanel" | "GridUI", ctx: ButtonInteraction, session: DRsession) {
        let embed
        let components

        switch (view) {
            case 'ActionPanel':
                embed = session.Views.ActionPanel.Panel(session)
                components = session.Views.ActionPanel.ActionButtons()
    
                ctx.update({
                    embeds: [embed],
                    components
                })
                break;
            
            case 'GridUI':
                const rendered =  session.Views.GridUI.renderGrid(session.Grid.currentGrid)
                embed = session.Views.GridUI.makeGridUI(rendered, session)
                components = session.Views.GridUI.GridControlsUI({ PM: session.Player, Grid: session.Grid})

                ctx.update({
                    embeds: [embed],
                    components
                })
                break;
        }
    }

    createLoggingArea(session: DRsession) {
        const LA = new LoggingArea()
        session.Areas?.set(LA.id, LA)

        return session.Areas?.get(LA.id)
    }

    makeUIbutton(buttonID: string, builder: ButtonBuilder) {
        builder.setCustomId(buttonID)

        //@ts-ignore
        this.ButtonList[buttonID] = builder

        this.emit("buttonCreate", buttonID, builder)

        return builder
    }

    makeUIembed(embedID: string, opts: {
        title?: string,
        description?: string,
        footer?: EmbedFooterOptions
    }) {
        if (opts.footer) opts.footer.text = opts.footer?.text ? opts.footer?.text + " | Clover" : ""

        const em = new EmbedBuilder()

        .setTitle(opts.title ? opts.title : " ")
        .setDescription(opts.description ? opts.description : " ")
        .setFooter(opts.footer ? opts.footer : {text: " "})
        
        // @ts-ignore
        this.EmbedList[embedID] = em

        this.emit("embedCreate", embedID, em)

        // @ts-ignore
        return this.EmbedList[embedID]
    }
}