"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// import CloverClient from "../CloverClient";
const fs_1 = __importDefault(require("fs"));
exports.default = (client, extraOptions) => {
    function loadCommands(dir) {
        var _a;
        const files = fs_1.default.readdirSync(path_1.default.join(__dirname, dir));
        for (const file of files) {
            const stat = fs_1.default.lstatSync(path_1.default.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                loadCommands(path_1.default.join(dir, file));
            }
            else if (file.endsWith(".js") || file.endsWith(".ts")) {
                const { default: option } = require(path_1.default.join(__dirname, dir, file));
                if (option.name) {
                    if (client) {
                        (_a = client.commands) === null || _a === void 0 ? void 0 : _a.set(option.name, option);
                    }
                }
            }
        }
    }
    function loadEvents(dir) {
        let amount = 0;
        const files = fs_1.default.readdirSync(path_1.default.join(__dirname, dir));
        for (const file of files) {
            const stat = fs_1.default.lstatSync(path_1.default.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                loadEvents(path_1.default.join(dir, file)); //if its a directory then do it again
            }
            else if (file.endsWith(".js") || file.endsWith(".ts")) {
                const event = require(path_1.default.join(dir, file));
                if (!event) { }
                else {
                    let eventName = file.split(".")[0];
                    client.on(eventName, event.default.bind(null, client));
                    amount++;
                }
            }
        }
        return amount;
    }
    loadCommands("../../" + extraOptions.commandsFolder);
    loadEvents("../../" + extraOptions.eventsFolder);
};
