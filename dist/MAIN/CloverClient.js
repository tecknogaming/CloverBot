"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const mongoose_1 = __importDefault(require("mongoose"));
const loader_1 = __importDefault(require("./utils/loader"));
const v10_1 = require("discord-api-types/v10");
const rest_1 = require("@discordjs/rest");
const builders_1 = require("@discordjs/builders");
class CloverClient extends discord_js_1.Client {
    constructor(token, options, extraOptions) {
        console.time("time");
        super(options);
        this.EXTRA_OPTIONS = extraOptions;
        this.TOKEN = token;
        this.commands = new discord_js_1.Collection();
        this.Sessions = new discord_js_1.Collection();
        if ((0, fs_1.existsSync)("Clover.config.json")) {
            this.CONF = require("../../Clover.config.json");
        }
        else {
            throw new Error('No "Clover.config.json" file detected');
        }
    }
    init() {
        this.login(this.TOKEN).then(() => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            yield this.connectToMongo();
            yield (0, loader_1.default)(this, this.EXTRA_OPTIONS);
            yield this.registerSlashCommands();
            console.log(`[CLIENT] | Logged in as ${(_a = this.user) === null || _a === void 0 ? void 0 : _a.username}#${(_b = this.user) === null || _b === void 0 ? void 0 : _b.discriminator}`);
            console.timeEnd("time");
        }));
    }
    registerSlashCommands() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const rest = new rest_1.REST({
                version: "10"
            }).setToken(this.TOKEN);
            let testCmd = [];
            let Gcmd = [];
            function readCommand(arr, v) {
                const cmd = new builders_1.SlashCommandBuilder()
                    .setName(v.name)
                    .setDescription(v.description);
                if (v.DMaccess)
                    cmd.setDMPermission(v.DMaccess);
                // if (v.permissions) cmd.setDefaultMemberPermissions([])
                if (v.options && v.options.length > 0) {
                    v.options.forEach((opts) => {
                        if (!opts.name)
                            throw new Error("Name was not provided!");
                        if (!opts.type)
                            throw new Error("Type was not provided!");
                        switch (opts.type) {
                            case 'TEXT':
                                cmd.addStringOption(opti => {
                                    const opt = opti
                                        .setName(opts.name)
                                        .setDescription(opts.description || "No Description");
                                    if (opts.choices)
                                        opt.addChoices(opts.choices);
                                    if (opts.required)
                                        opt.setRequired(opts.required);
                                    if (opts.minLength)
                                        opt.setMinLength(opts.minLength);
                                    if (opts.maxLength)
                                        opt.setMaxLength(opts.maxLength);
                                    return opt;
                                });
                                break;
                            case 'USER':
                                cmd.addUserOption(opti => {
                                    const opt = opti
                                        .setName(opts.name)
                                        .setDescription(opts.description || "No Description");
                                    if (opts.required)
                                        opt.setRequired(opts.required);
                                    return opt;
                                });
                                break;
                            case 'CHANNEL':
                                cmd.addChannelOption(opti => {
                                    const opt = opti
                                        .setName(opts.name)
                                        .setDescription(opts.description || "No Description");
                                    if (opts.required)
                                        opt.setRequired(opts.required);
                                    return opt;
                                });
                                break;
                            case 'ATTACHMENT':
                                cmd.addAttachmentOption(opti => {
                                    const opt = opti
                                        .setName(opts.name)
                                        .setDescription(opts.description || "No Description");
                                    if (opts.required)
                                        opt.setRequired(opts.required);
                                    return opt;
                                });
                                break;
                            case 'BOOLEAN':
                                cmd.addBooleanOption(opti => {
                                    const opt = opti
                                        .setName(opts.name)
                                        .setDescription(opts.description || "No Description");
                                    if (opts.required)
                                        opt.setRequired(opts.required);
                                    return opt;
                                });
                                break;
                        }
                    });
                }
                console.log(`[SLASH COMMAND BUILDER] | Command "${v.name}" has been registered!`);
                arr.push(cmd);
            }
            (_a = this.commands) === null || _a === void 0 ? void 0 : _a.each((v, k, c) => __awaiter(this, void 0, void 0, function* () {
                if (!v.description)
                    return console.log("No description for slash commands!");
                if (v.test) {
                    readCommand(testCmd, v);
                    // testCmd.push(new SlashCommandBuilder().setName(v.name).setDescription(v.description))
                }
                else {
                    readCommand(Gcmd, v);
                    // Gcmd.push(new SlashCommandBuilder().setName(v.name).setDescription(v.description))
                }
            }));
            if (testCmd.length > 0) {
                //@ts-ignore
                rest.put(v10_1.Routes.applicationGuildCommands(this.user.id, (_b = this.CONF) === null || _b === void 0 ? void 0 : _b.testServer), {
                    body: testCmd.map(c => c.toJSON())
                });
            }
            if (Gcmd.length > 0) {
                //@ts-ignore
                rest.put(v10_1.Routes.applicationCommands(this.user.id), {
                    body: Gcmd.map(c => c.toJSON())
                });
            }
        });
    }
    connectToMongo() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            mongoose_1.default.connect((_a = this.CONF) === null || _a === void 0 ? void 0 : _a.mongoURI, {
                keepAlive: true
            });
            const conn = mongoose_1.default.connection;
            mongoose_1.default.connection.on("connecting", () => {
                console.log("[MONGOOSE] | Connecting...");
            });
            mongoose_1.default.connection.on("connected", () => {
                console.log("[MONGOOSE] | Connected!");
            });
        });
    }
}
exports.default = CloverClient;
