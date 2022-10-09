import { model, Schema } from "mongoose";

const ReqStr = {
    type: String,
    required: true
}

const userShema = new Schema({
    uid: String,
    avatarURL: {
        type: String,
        default: "none"
    },
    bannerURL: {
        type: String,
        default: "none"
    },
    Description: String,
    Rank: String,
    level: Number,
    exp: Number,

    balance: Number,

    basicAttack: Object,
    specialAttacks: Array,

    stats: {
        HP: Number,
        Attack: Number,
        Defense: Number,
        SpAttack: Number,
        SpDefense: Number,
        Speed: Number,
        Accuracy: Number,
    },

    inventory: {
        mainWeapon: {},
        secondaryWeapon: {},
        items: []
    }
})

export default model("User", userShema)