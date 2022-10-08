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
const UserSchema_1 = __importDefault(require("../Schemas/UserSchema"));
class UserManager {
    constructor() {
    }
    create(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield UserSchema_1.default.exists({ uid })) {
                return false;
            }
            else {
                let userData = {
                    uid,
                    Rank: "Beginer",
                    level: 1,
                    exp: 0,
                    balance: 1000,
                    basicAttack: {
                        Name: "testAttack",
                        Type: "physical",
                        Description: "A test Attack",
                        Damage: 10
                    },
                    stats: {
                        HP: 10,
                        Attack: 5,
                        Defense: 3,
                        SpAttack: 4,
                        SpDefense: 4,
                        Speed: 5,
                        Accuracy: 10
                    },
                    inventory: {
                        mainWeapon: {
                            Name: "Test Weapon #1",
                            Icon: "121212121",
                            Description: "Just a test weopon",
                            UUID: "b991a502-df12-4295-8ec6-cf793a6c484c"
                        },
                        secondaryWeapon: {
                            Name: "Test Weapon #2",
                            Icon: "121212121",
                            Description: "Just a test weopon",
                            UUID: "8417e745-cd71-4638-b3e9-b9b616016518"
                        },
                        items: []
                    }
                };
                UserSchema_1.default.create(userData);
                return userData;
            }
        });
    }
    getUserData(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            yield UserSchema_1.default.findOne({ uid }).then(incoming => { data = incoming; });
            return data;
        });
    }
}
exports.default = UserManager;
