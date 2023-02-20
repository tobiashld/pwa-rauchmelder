import {  Auftraggeber, DBResponse, GeprRauchmelder, Pruefung,   } from "../types/allgemein"
import { ClientStatus } from "../types/statusenum"
import auftraggeber from "./postsql_db/auftraggeber"
import user from "./postsql_db/user"
import objekte from "./postsql_db/objekte"
import wohnungen from "./postsql_db/wohnungen"
import { db } from "./myappdatabase"
import rauchmelder from "./postsql_db/rauchmelder"
import pruefungen from "./postsql_db/pruefungen"
import { RauchmelderBeziehung } from "../types/rauchmelder"

const dataFunctions = {
    [ClientStatus.offline]:{

        pruefungen:{
            create:(pruefung:Pruefung)=>{
                //Pruefung an sich speichern
                db.table("pruefungen").add({
                    id:0,
                    objektID:pruefung.objekt?.id,
                    timestamp:"jetzt",
                    userID:pruefung.user?.id,
                }).then((value)=>{
                    console.log(value)
                    db.table("pruefungenListe").bulkAdd(pruefung.rauchmelder)
                })                
            },
            getPruefungen:()=>db.table("pruefungen").toArray(),
            deletePruefung:(pruefung:Pruefung)=>db.table("pruefungen").delete(pruefung.id)
        },
        rauchmelder:{
            get:(props:{[key:string]:number}|undefined,cb?:(data:DBResponse<RauchmelderBeziehung>)=>void)=>{
                if(props){
                    db.table("rauchmelder").filter((rauchmelder)=>rauchmelder[Object.keys(props)[0]]===props[Object.keys(props)[0]]).toArray().then(data=>{
                        if(cb){
                            cb({
                                status:200,
                                data:data
                            })
                        } 
                    })
                }else{
                    db.table("rauchmelder").toArray().then(value=>{
                        if(cb){
                            cb({
                                status:200,
                                data:value
                            })
                        }
                    })
                }
            },
            addRauchmelder:(geprRauchmelder: GeprRauchmelder)=>db.table("gepruefteRauchmelder").add(geprRauchmelder,geprRauchmelder.id),
            deleteRauchmelder:(geprRauchmelder:GeprRauchmelder)=>db.table("gepruefteRauchmelder").delete(geprRauchmelder.id),
            getAllRauchmelder:()=>db.table("gepruefteRauchmelder").toArray(),
            getRauchmelderWithParams:()=>db.table("gepruefteRauchmelder").toArray()
        },
        auftraggeber:{
            get:(props:any,cb?:(data:any[])=>void)=>{
                db.table("auftraggeber").toArray().then(data=>{
                    if(cb){
                        cb(data)
                    }
                })
            },
            create:(auftraggeber:Auftraggeber,cb?:(data:any)=>void)=>{
                db.table("auftraggeber").add(auftraggeber.prepForSave())
            },
            change:auftraggeber.change,
            delete:auftraggeber.deleteA
        },
        objekte:{
            get:(props:any,cb?:(data:any[])=>void)=>{
                db.table("objekte").toArray().then(data=>{
                    console.log(data)
                    if(cb){
                        cb(data)
                    }
                })
            },
            create:objekte.add,
            change:objekte.change,
            delete:objekte.deleteO
        },
        
    },
    [ClientStatus.online]:{
        pruefungen:{
            get:pruefungen.get,
            create:pruefungen.add,
            change:pruefungen.change,
            delete:pruefungen.deleteP,
            statistics:pruefungen.statistics
        },
        rauchmelder:{
            get:rauchmelder.get,
            create:rauchmelder.add,
            getForObject:rauchmelder.getForObject,
            change:rauchmelder.change,
            delete:rauchmelder.deleteR,
            getHistory:rauchmelder.getHistory,
            switch:rauchmelder.switchRauchmelder
        },
        user:{
            get:user.get,
            create:user.add,
            change:user.change,
            delete:user.deleteU,
            login:user.login,
            changepw:user.changepw
        },
        auftraggeber:{
            get:auftraggeber.get,
            create:auftraggeber.add,
            change:auftraggeber.change,
            delete:auftraggeber.deleteA
        },
        wohnungen:{
            get:wohnungen.get,
            create:wohnungen.add,
            change:wohnungen.change,
            delete:wohnungen.deleteW
        },
        objekte:{
            get:objekte.get,
            create:objekte.add,
            change:objekte.change,
            delete:objekte.deleteO
        },
        prepareOffline:async (cb?:()=>void)=>{

            //Wohnungen aus db cachen 
            db.table("wohnungen").clear().then(nothing=>{
                wohnungen.get(undefined,(data)=>{
                    db.table("wohnungen").bulkAdd(data.data!)
                })
            })
            .catch(error=>console.error(error))

            //Objekte aus db cachen
            db.table("objekte").clear().then(nothing=>{
                objekte.get(undefined,(data)=>{
                    db.table("objekte").bulkAdd(data.data!)
                })
            }).catch(error=>console.error(error))

            //Rauchmelder aus db cachen
            db.table("rauchmelder").clear().then(nothing=>{
                rauchmelder.get(undefined,data=>{
                    db.table("rauchmelder").bulkAdd(data.data!)
                })
            }).catch(error=>console.error(error))
            
            //Auftraggeber aus db cachen
            db.table("auftraggeber").clear()
            .then(nothing=>{
                auftraggeber.get(undefined,(data)=>{
                    db.table("auftraggeber").bulkAdd(data.data!)
                })
            }).catch(error=>console.error(error))

            if(cb){
                cb()
            }
        },
        syncPruefungen:async()=>{
            // const gecachteRauchmelder : GeprRauchmelder[] = (await db.table("gepruefteRauchmelder").toArray()).map((rauch:GeprRauchmelder)=>rauch)
            // const gecachtePruefungen : Pruefung[] = (await db.table("pruefungen").toArray()).map((pruefung:Pruefung)=>pruefung)
            // gecachtePruefungen.at(1)
            // gecachteRauchmelder.at(1)
            // // get last pruefungsindex 
            // // +1 
            // // update all docs if Pruefung noch nicht in 
            // return 1
        }  
    }
}

export default dataFunctions