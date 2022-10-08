"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AREA_1 = __importDefault(require("./AREA"));
class LoggingArea extends AREA_1.default {
    constructor() {
        super("LoggingArea", {
            logs: []
        });
    }
    render() {
        const log = this.data.logs.map((m) => { return m.content + "\n"; }).join('');
        return `\`\`\`\n${log}\n\`\`\``;
    }
    addToLog(content) {
        this.data.logs.push({
            content,
            createdAt: new Date()
        });
        if (this.data.logs.length > 5)
            this.data.logs.shift();
        return {
            content,
            createdAt: new Date()
        };
    }
}
exports.default = LoggingArea;
