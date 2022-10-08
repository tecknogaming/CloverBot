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
const DungeonRunner_1 = __importDefault(require("../../MAIN/managers/DR/DungeonRunner"));
const UserManager_1 = __importDefault(require("../../MAIN/managers/UserManager"));
exports.default = {
    name: "start",
    description: "Start a dungeon run!",
    test: true,
    exec: (client, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const UM = new UserManager_1.default();
        const data = yield UM.getUserData(ctx.user.id);
        // console.log(data)
        //@ts-ignore
        const DR = new DungeonRunner_1.default(ctx.user.id, data);
        DR.initSession(client);
        DR.startRun(ctx);
    })
};
