import { Collection } from "discord.js"
import { IDungeonRunner } from "./interfaces"
import DungeonRunner from "./managers/DR/DungeonRunner"
import GridManager from "./managers/DR/GridManager"
import PlayerManager from "./managers/DR/PlayerManager"
import Renderer from "./managers/DR/Renderer"
import { ActionPanel } from "./managers/DR/Views/ActionPanel"
import { GridUI } from "./managers/DR/Views/GridUI"

export type CloverConfigJSON = {
    owners?: string[]
    mongoURI?: string
    testServer?: string
}

export type CloverCLIextraOptions = {
    commandsFolder: string
    eventsFolder: string 
}

export type CloverCommand = {
    name: string
    description: string
    dev?: boolean
    ownerOnly?: boolean
    DMaccess?: boolean
    permissions?: any[]

    exec: Function
    DMexec?: Function
}

export type CloverCommandOptions = {
    name: string
    type: "TEXT" | "USER" | "ATTACHMENT" | "BOOLEAN" | "CHANNEL"
    required?: boolean
    description?: string

    //Text
    choices?: any
    minLength?: number
    maxLength?: number
}

export type CloverUser = {
    uid: string
    avatarURL?: string | "none"
    bannerURL?: string | "none"
    Description?: string
    Rank: "Beginer"
    level: number
    exp: number

    balance: number

    basicAttack: Attack
    specialAttacks?: Attack[]

    stats: Stats

    inventory: Inventory
}

export type Item = {
    Name: string,
    Description: string | "No Description"
    UUID: string

    itemData?: Object
    crafting?: string[]


}

export type Weapon = {
    Name: string
    Icon: string
    Description: string | "No Description"
    UUID: string
}

export type Attack = {
    Name: string
    Type: "physical" | "special"
    Description?: string
    Damage: number
}


export type DRsession = {
    uId: string
    sessionId: string

    exp: number
    level: number

    Inventory: Inventory
    Stats: Stats
    basicAttack: Attack
    specialAttacks?: Attack[]

    dungeonLevel: number

    paused?: boolean

    DungeonManager: DungeonRunner
    Grid: GridManager
    Renderer: Renderer
    Player: PlayerManager

    Areas?: Collection<string, any>
    Views: {
        GridUI: GridUI
        ActionPanel: ActionPanel
    }
}

export type DRgridData = {
    grid: DRGridArray
    EnemiesTable: DRenemy[]
    LevelsUp: DRGridArray[]
    LevelsDown: DRGridArray[]
}

export type DRlevel = {
    levelIndex: number
    grid: DRGridArray
    encounterTable?: DRenemy[]
}

export type DRtile = {
    texture: string
    tileIndex: number
    tier: DRtileTier
}

export type DRtileTier = "floor" | "wall" | "boss" | "stairs" | "ladder"

export type DRenemy = {
    uuid: string,
    manifest: DManifest
}

export type DRGridArray = DRtile[][]

export type LAlogs = {
    content: string
    createdAt: number
}

type Stats = {
    HP: number
    Attack: number
    Defense: number
    SpAttack: number
    SpDefense: number
    Speed: number
    Accuracy: number
}

type Inventory = {
    mainWeapon?: Weapon
    secondaryWeapon?: Weapon
    items: Item[]
}

type DManifest = {
    name?: string
    description?: string

    canBeDroped?: boolean
    canBeCorrupted?: boolean

    damage?: number
    basicAttackDamage?: number
    specialAttacks?: Attack[]

    maxDungeonLevelEncounter: number

    dropTable: string[]
}