import UserSchema from "../Schemas/UserSchema";
import { CloverUser } from "../types";

export default class UserManager {
    constructor() {

    }

    async create(uid: string) {
        if (await UserSchema.exists({ uid })) {return false} else 
        {
            let userData: CloverUser = {
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
            }
    
            UserSchema.create(userData)
            return userData
    
        }
    }

    async getUserData(uid: string) {
        let data 
        await UserSchema.findOne({ uid }).then ( incoming => { data = incoming } )    
        return data    
    }


}