import { Client, ClientOptions, Collection } from "discord.js"
import { existsSync } from "fs"
import mongoose from "mongoose"
import { CloverCLIextraOptions, CloverCommand, CloverCommandOptions, CloverConfigJSON, DRsession } from "./types"
import loader from "./utils/loader"
import { Routes } from "discord-api-types/v10"
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";

export default class CloverClient extends Client {
    private EXTRA_OPTIONS: CloverCLIextraOptions
    private TOKEN: string

    declare public commands?: Collection<string, any>
    declare public CONF?: CloverConfigJSON
    declare public Sessions: Collection<string, DRsession>

    constructor(token: string, options: ClientOptions, extraOptions: CloverCLIextraOptions) {
        console.time("time")
        super(options);
        

        this.EXTRA_OPTIONS = extraOptions;
        this.TOKEN = token;

        this.commands = new Collection();
        this.Sessions = new Collection();

        if (existsSync("Clover.config.json")) {
            this.CONF = require("../../Clover.config.json");
        } else {
            throw new Error('No "Clover.config.json" file detected');
        }
    }

    init() {

        this.login(this.TOKEN).then(async () => {
            await this.connectToMongo()
            await loader(this, this.EXTRA_OPTIONS);
            await this.registerSlashCommands()

            console.log(`[CLIENT] | Logged in as ${this.user?.username}#${this.user?.discriminator}`);
            console.timeEnd("time")
        });
    }
    async registerSlashCommands() {
        const rest = new REST({
            version: "10"
        }).setToken(this.TOKEN);

        let testCmd: SlashCommandBuilder[] = []
        let Gcmd: SlashCommandBuilder[] = []

        function readCommand(arr: SlashCommandBuilder[], v: any) {
            const cmd = new SlashCommandBuilder()
                            .setName(v.name)
                            .setDescription(v.description)
            
            if (v.DMaccess) cmd.setDMPermission(v.DMaccess)
            // if (v.permissions) cmd.setDefaultMemberPermissions([])

            if (v.options && v.options.length > 0) {
                v.options.forEach((opts: CloverCommandOptions) => {
                    if (!opts.name) throw new Error("Name was not provided!")
                    if (!opts.type) throw new Error("Type was not provided!")

                    switch (opts.type) {
                        case 'TEXT':
                            cmd.addStringOption(opti => {
                                const opt = opti
                                    .setName(opts.name)
                                    .setDescription(opts.description || "No Description")
                                
                                if (opts.choices) opt.addChoices(opts.choices)
                                if (opts.required) opt.setRequired(opts.required)
                                
                                if (opts.minLength) opt.setMinLength(opts.minLength)
                                if (opts.maxLength) opt.setMaxLength(opts.maxLength)
                                return opt 
                            })
                            break
                        
                        case 'USER':
                            cmd.addUserOption(opti => {
                                const opt = opti
                                    .setName(opts.name)
                                    .setDescription(opts.description || "No Description")
                                    
                                if (opts.required) opt.setRequired(opts.required)
                                return opt
                            })
                            break
                        
                        case 'CHANNEL':
                            cmd.addChannelOption(opti => {
                                const opt = opti
                                    .setName(opts.name)
                                    .setDescription(opts.description || "No Description")

                                if (opts.required) opt.setRequired(opts.required)
                                return opt
                            })
                            break
                        
                        case 'ATTACHMENT':
                            cmd.addAttachmentOption(opti => {
                                const opt = opti
                                    .setName(opts.name)
                                    .setDescription(opts.description || "No Description")

                                if (opts.required) opt.setRequired(opts.required)
                                return opt
                            })
                            break
                        
                        case 'BOOLEAN':
                            cmd.addBooleanOption(opti => {
                                const opt = opti
                                    .setName(opts.name)
                                    .setDescription(opts.description || "No Description")

                                if (opts.required) opt.setRequired(opts.required)
                                return opt
                            })
                            break
                    }
                });
            }

            console.log(`[SLASH COMMAND BUILDER] | Command "${v.name}" has been registered!`)
            arr.push(cmd)
        }

        this.commands?.each(async (v, k, c,) => {
            if (!v.description) return console.log("No description for slash commands!")

            if (v.test) {
                readCommand(testCmd, v)
                // testCmd.push(new SlashCommandBuilder().setName(v.name).setDescription(v.description))
            } else {
                readCommand(Gcmd, v)
                // Gcmd.push(new SlashCommandBuilder().setName(v.name).setDescription(v.description))
            }
        })

        if (testCmd.length > 0) {
            //@ts-ignore
            rest.put(Routes.applicationGuildCommands(this.user.id, this.CONF?.testServer), {
                body: testCmd.map(c => c.toJSON())
            })
        }

        if (Gcmd.length > 0) {
            //@ts-ignore
            rest.put(Routes.applicationCommands(this.user.id), {
                body: Gcmd.map(c => c.toJSON())
            })
        }
    }

    async connectToMongo() {
        // @ts-ignore
        mongoose.connect(this.CONF?.mongoURI, {
            keepAlive: true
        })

        const conn = mongoose.connection

        mongoose.connection.on("connecting", () => {
            console.log("[MONGOOSE] | Connecting...")
        })

        mongoose.connection.on("connected", () => {
            console.log("[MONGOOSE] | Connected!")
        })
    }
}