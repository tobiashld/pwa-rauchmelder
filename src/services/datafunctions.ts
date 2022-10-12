import { ClientStatus } from "../types/statusenum"
import auftraggeber from "./firestore/auftraggeber"
import user from "./firestore/user"

const data = {
    [ClientStatus.offline]:{
        pruefungen:{
            
        },
        user:{
            
        }
    },
    [ClientStatus.online]:{
        pruefungen:{
            
        },
        user:{
            get:user.getUsers,
            getWithParam:user.getUsersWithParam,
            getWithParams:user.getUsersWithParams,
        },
        auftraggeber:{
            get:auftraggeber.getAuftraggeber,
            getWithParam:auftraggeber.getAuftraggeberWithParam,
            getWithParams:auftraggeber.getAuftraggeberWithParams
        }
    }
}

export default data