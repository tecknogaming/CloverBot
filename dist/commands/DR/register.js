"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserManager_1 = __importDefault(require("../../MAIN/managers/UserManager"));
exports.default = {
    name: "register",
    description: "Register to Clover!",
    test: true,
    exec: (client, ctx) => {
        const UM = new UserManager_1.default();
        let res = UM.create(ctx.user.id);
        if (!UM.getUserData(ctx.user.id)) {
            return ctx.reply("You have already signed up!");
        }
        else {
            ctx.reply("done! You have signed up!");
        }
    }
};
