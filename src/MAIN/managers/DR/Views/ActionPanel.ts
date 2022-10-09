import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { DRsession } from "../../../types";
import Renderer from "../Renderer";

export class ActionPanel extends Renderer {
    constructor() {
        super()
    }

    Panel(session: DRsession): EmbedBuilder {
        const embed: EmbedBuilder = this.makeUIembed("PANEL", {
            title: "Action Menu!",
            description: "",
            footer: {
                text: "Panel"
            }
        })

        embed.setColor("Aqua")
        embed.setFields(
            {
                name: "Player",
                value:  `Health: \`${session.Stats.HP}\`\n` +
                        `\n` +
                        `Level: \`${session.level}\`\n` +
                        `EXP: \`${session.exp}\``
            }
        )

        return embed
    }

    ActionButtons() {
        const rows = [
            new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    this.makeUIbutton("ACT-EXIT-PANEL", 
                        new ButtonBuilder()
                        .setEmoji("❌")
                        .setStyle(ButtonStyle.Secondary)
                    )
                )
        ]

        return rows
    }
}