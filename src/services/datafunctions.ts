import {  GeprRauchmelder, Objekt, Pruefung,   } from "../types/allgemein"
import { ClientStatus } from "../types/statusenum"
import auftraggeber from "./firestore/auftraggeber"
import user from "./firestore/user"
import objekte from "./firestore/objekte"
import wohnungen from "./firestore/wohnungen"
import { db } from "./myappdatabase"
import rauchmelder from "./firestore/rauchmelder"

const data = {
    [ClientStatus.offline]:{
        pruefungen:{
            create:(pruefung:Pruefung)=>db.table("pruefungen").add(pruefung,pruefung.id),
            getPruefungen:()=>db.table("pruefungen").toArray(),
            deletePruefung:(pruefung:Pruefung)=>db.table("pruefungen").delete(pruefung.id)
        },
        rauchmelder:{
            addRauchmelder:(geprRauchmelder: GeprRauchmelder)=>db.table("gepruefteRauchmelder").add(geprRauchmelder,geprRauchmelder.id),
            deleteRauchmelder:(geprRauchmelder:GeprRauchmelder)=>db.table("gepruefteRauchmelder").delete(geprRauchmelder.id),
            getAllRauchmelder:()=>db.table("gepruefteRauchmelder").toArray(),
            getRauchmelderWithParams:()=>db.table("gepruefteRauchmelder").toArray()
        }
        
    },
    [ClientStatus.online]:{
        pruefungen:{
            
        },
        rauchmelder:{
            get:rauchmelder.getRauchmelder,
            getWithParam:rauchmelder.getRauchmelderWithParam,
            getWithParams:rauchmelder.getRauchmelderWithParams,
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
        },
        objekte:{
            get:objekte.getObjekte,
            getWithParam:objekte.getObjekteWithParam,
            getWithParams:objekte.getObjekteWithParams
        },
        prepareOffline:async (objekt:Objekt)=>{
            db.table("wohnungen").clear().then(data=>console.log("successfully deleted old data")).catch(error=>console.error(error.message))
            db.table("objekte").clear().then(data=>console.log("successfully deleted old data")).catch(error=>console.error(error.message))
            db.table("rauchmelder").clear().then(data=>console.log("successfully deleted old data")).catch(error=>console.error(error.message))
            const wohnungenListeToCache = await wohnungen.getWohnungWithParam("objekt.id",objekt.id)
            wohnungenListeToCache.every(wohnung=>db.table("wohnungen").add(wohnung,wohnung.id))
            const rauchmelderListeToCache = await rauchmelder.getRauchmelderWithParam("objekt.id",objekt.id)
            rauchmelderListeToCache.every(rauchmelder=>db.table("rauchmelder").add(rauchmelder,rauchmelder.id))
            db.table("objekte").add(objekt)
        },
        syncPruefungen:async()=>{
            const gecachteRauchmelder : GeprRauchmelder[] = (await db.table("gepruefteRauchmelder").toArray()).map((rauch:GeprRauchmelder)=>rauch)
            const gecachtePruefungen : Pruefung[] = (await db.table("pruefungen").toArray()).map((pruefung:Pruefung)=>pruefung)
            gecachtePruefungen.at(1)
            gecachteRauchmelder.at(1)
            // get last pruefungsindex 
            // +1 
            // update all docs if Pruefung noch nicht in 
            return 1
        }  
    }
}

export default data