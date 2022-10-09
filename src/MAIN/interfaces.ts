import { ClientOptions, Collection, Client } from "discord.js"
import { CloverUser, DRsession } from "./types"

export interface CloverClient extends Client {
    constructor(token: string, options: ClientOptions): void
    init(): void

    commands: Collection<string, any>
}

export interface IDungeonRunner {
    constructor: (uid: string, playerData: CloverUser) => Function

    PLAYER_DATA: CloverUser
    SESSION_DATA: DRsession

    initSession(uid: string): DRsession
    startRun(): boolean
    endRun(): boolean
    pauseRun(): boolean
}