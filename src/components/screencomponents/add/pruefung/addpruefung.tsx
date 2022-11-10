import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import data from '../../../../services/datafunctions'
import { Adresse, GeprRauchmelder, Objekt, Pruefung, Rauchmelder, toPruefungConverter, toRauchmelderConverter, User } from '../../../../types/allgemein'
import { ClientStatus } from '../../../../types/statusenum'
import AddButton from '../../../addbutton/addbutton'
import styles from './addpruefung.module.css'

function AddPruefung() {
    const [currGeprRauchmelder,setCurrGeprRauchmelder] = useState<GeprRauchmelder | undefined>() 
    const [pruefObjekt,setPruefObjekt] = useState<Objekt>(new Objekt(1,new Adresse(1,"1","1","1"),"test","name",1))
    const [currPruefung,setCurrPruefung] = useState<Pruefung>(new Pruefung(0,"",new User(0,"admin"),pruefObjekt,[]))
    //const [allePruefObjekte,setAllePruefObjekte] = useState<Objekt[] | undefined>()
    const [alleRauchmelder,setAlleRauchmelder] = useState<Rauchmelder[]>([])
    const { id } = useParams()
    const rauchmelderselectRef = useRef<HTMLSelectElement>(null)

    useEffect(()=>{
        console.log("rauchmelder changed")
        console.log(alleRauchmelder)
        setPruefObjekt(new Objekt(1,new Adresse(1,"1","1","1"),"test","name",1))
    },[alleRauchmelder])
    useEffect(()=>{
        if(id){
            data[ClientStatus.online].pruefungen.get({"id":id},(prepData:any[])=>{
                if(prepData.length > 0){
                    setCurrPruefung(prepData.map(pruefung=>toPruefungConverter(pruefung))[0])
                }else{
                    //TODO error werfen oder anzeigen
                }
                //nur für linter
                
            })
        }else{
            data[ClientStatus.online].rauchmelder.get({"objektID":pruefObjekt?pruefObjekt.id:1},(data:any[])=>{
                console.log("NADA")
                setAlleRauchmelder(data.map(rauchmelder=>toRauchmelderConverter(rauchmelder)))
            })
            // data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
            //     setAllePruefObjekte(data.map(objekt=>toObjektConverter(objekt)))
            // })
        }
    },[id, pruefObjekt])
    
    

    

    return (
        <div className={styles.gesamtbox}>
            <div className={styles.outerbox}>
                <div className={styles.rauchmelderbox} >
                    <div className={styles.rauchmelderboxInside}>
                        <>
                        <div className={styles.rauchmeldercard + " " + styles.addcard}>
                            <select
                                ref={rauchmelderselectRef}
                                className={styles.rauchmelderselect}
                            >
                                {
                                    alleRauchmelder.filter(rauchmelder=>(currGeprRauchmelder)?rauchmelder.id!==currGeprRauchmelder.id:true).map(rauchmelder=>{
                                        return (
                                            <option value={rauchmelder.id}>
                                                {rauchmelder.mieter+" "+rauchmelder.raum+" "+rauchmelder.seriennr}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <AddButton routeParam='test' onClick={()=>{
                                if(!rauchmelderselectRef.current!.value || rauchmelderselectRef.current!.value === "")return
                                data[ClientStatus.online].rauchmelder.get({"id":rauchmelderselectRef.current!.value},(data)=>{
                                    let rauchmelder = toRauchmelderConverter(data[0])
                                    let geprRauchmelder = new GeprRauchmelder(rauchmelder.id,0,true,true,true,true,true,true,true,"","","now",currPruefung?.id)
                                    let newGeprRauchmelderList = (currPruefung && currPruefung.rauchmelder)?currPruefung?.rauchmelder.slice():[]
                                    newGeprRauchmelderList.push(geprRauchmelder)
                                    let helperPruefung = new Pruefung(currPruefung!.id,currPruefung!.timestamp,currPruefung!.user,currPruefung!.objekt,newGeprRauchmelderList)
                                    setCurrGeprRauchmelder(geprRauchmelder)
                                    setCurrPruefung(helperPruefung)
                                    setAlleRauchmelder(alleRauchmelder.filter(rauchmelder=>currPruefung.rauchmelder.find(gepruefteRauchmelder=>gepruefteRauchmelder.id===rauchmelder.id)?false:true))
                                })
                            }}/>
                        </div>
                        {
                            currPruefung.rauchmelder.map(rauchmelder=>{
                                return (
                                    <div className={(rauchmelder.id === currGeprRauchmelder!.id)?styles.rauchmeldercard + " "+styles.activeRauchmelder:styles.rauchmeldercard} onClick={(event)=>{
                                        setCurrGeprRauchmelder(rauchmelder)
                                    }}>
                                        <div className={styles.rauchmeldercardtext}>
                                            {rauchmelder.id}
                                        </div>
                                    </div>)
                            })
                        }
                        </>
                    </div>
                </div>
                <div className={styles.pruefungsbox}>
                    <div className={styles.pruefungboxInside}>
                        <div className={styles.pruefungHeader}>

                        </div>
                        <div>
                        {
                            currGeprRauchmelder?.id
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPruefung