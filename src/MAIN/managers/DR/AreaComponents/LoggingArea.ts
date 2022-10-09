import { LAlogs } from "../../../types";
import AREA from "./AREA";

export default class LoggingArea extends AREA {
    constructor() {
        super("LoggingArea", {
            logs: []
        })
    }

    render() {
        const log = this.data.logs.map((m: LAlogs) => { return m.content + "\n" }).join('')
        return `\`\`\`\n${log}\n\`\`\``
    }

    addToLog(content: string) {
        this.data.logs.push({
            content,
            createdAt: new Date()
        })

        if (this.data.logs.length > 5) this.data.logs.shift()

        return {
            content,
            createdAt: new Date()
        }
    }
}