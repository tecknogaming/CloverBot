"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReqStr = {
    type: String,
    required: true
};
const userShema = new mongoose_1.Schema({
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
});
exports.default = (0, mongoose_1.model)("User", userShema);
