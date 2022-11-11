import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '../../../../services/datafunctions'
import { setPruefObjekt } from '../../../../store/slice'
import { RootState, useAppDispatch } from '../../../../store/store'
import {  GeprRauchmelder, Objekt, Pruefung, Rauchmelder,  toPruefungConverter, toRauchmelderConverter, User } from '../../../../types/allgemein'
import { ClientStatus } from '../../../../types/statusenum'
import AddButton from '../../../addbutton/addbutton'
import styles from './addpruefung.module.css'

function AddPruefung() {
    const [currGeprRauchmelder,setCurrGeprRauchmelder] = useState<GeprRauchmelder | undefined>()
    const pruefObjektString = useSelector((state:RootState)=>state.currPruefobjekt)
    const [currPruefObjekt,setCurrPruefObjekt] = useState<Objekt | undefined>(pruefObjektString?JSON.parse(pruefObjektString):undefined)
    const [currPruefung,setCurrPruefung] = useState<Pruefung | undefined>(undefined)
    const [currSelectedRauchmelder,setCurrSelectedRauchmelder] = useState<Rauchmelder | undefined>()
    //const [allePruefObjekte,setAllePruefObjekte] = useState<Objekt[] | undefined>()
    const [alleRauchmelder,setAlleRauchmelder] = useState<Rauchmelder[]>([])
    const dispatch = useAppDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const { id } = useParams()
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
        },
    };

    useEffect(()=>{
        setCurrPruefObjekt(pruefObjektString?JSON.parse(pruefObjektString):undefined)
    },[pruefObjektString])

    useEffect(()=>{
        data[ClientStatus.online].rauchmelder.get({"objektID":currPruefObjekt?currPruefObjekt.id:1},(data:any[])=>{
            setAlleRauchmelder(data.map(rauchmelder=>toRauchmelderConverter(rauchmelder)))})
        if(id){
            data[ClientStatus.online].pruefungen.get({"id":id},(prepData:any[])=>{
                if(prepData.length > 0){
                    
                    let helpPruefung = prepData.map(pruefung=>toPruefungConverter(pruefung))[0]
                    setCurrPruefung(helpPruefung)
                    if(!currPruefObjekt || currPruefObjekt.id !== helpPruefung.objekt.id){
                        dispatch(setPruefObjekt({pruefObjekt:JSON.stringify(helpPruefung.objekt)}))
                    }

                    console.log(helpPruefung)
                }else{
                    //TODO error werfen oder anzeigen
                }
                //nur für linter
                
            })
        }else{
            setCurrPruefung(new Pruefung(0,"",new User(0,"admin"),currPruefObjekt!,[]))
            // data[ClientStatus.online].objekte.get(undefined,(data:any[])=>{
            //     setAllePruefObjekte(data.map(objekt=>toObjektConverter(objekt)))
            // })
        }
    },[dispatch, id, currPruefObjekt])
    
    const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode)=>{
        setCurrSelectedRauchmelder(JSON.parse(event.target.value))
    }

    

    return (
        <div className={styles.gesamtbox}>
            <div className={styles.outerbox}>
                <div className={styles.rauchmelderbox} >
                    <div className={styles.rauchmelderboxInside}>
                        <>
                        <div className={styles.rauchmeldercard + " " + styles.addcard}>
                            <FormControl sx={{ width:"98%" }} >
                                <InputLabel id="Rauchmelder">Rauchmelder</InputLabel>
                                <Select
                                    labelId="Rauchmelder"
                                    id="single-select"
                                    value={currSelectedRauchmelder?JSON.stringify(currSelectedRauchmelder):""}
                                    label="Rauchmelder"
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Rauchmelder" />}
                                    MenuProps={MenuProps}
                                    renderValue={(value)=>{
                                        console.log("value :")
                                        console.log(value)
                                        if(value=== "")return ""
                                        let rauchmelder : Rauchmelder= JSON.parse(value)
                                        return rauchmelder.mieter + " " + rauchmelder.raum
                                    }}
                                >
                                    {
                                    alleRauchmelder.filter(rauchmelder=>currPruefung?.rauchmelder.find(index=>index.id===rauchmelder.id)?false:true).map(rauchmelder=>(
                                            <MenuItem
                                                key={rauchmelder.id}
                                                value={JSON.stringify(rauchmelder)}
                                            >
                                                {rauchmelder.mieter + " "+ rauchmelder.raum }
                                            </MenuItem>
                                    ))
                                    }
                                    
                                </Select>
                            </FormControl>
                            <AddButton routeParam='test' onClick={()=>{
                                if(!currSelectedRauchmelder)return
                                if(currPruefung?.rauchmelder.find(item=>item.id===currSelectedRauchmelder.id)){
                                    enqueueSnackbar("Dieser Rauchmelder ist bereits geprüft!",{variant:"warning"})
                                    return
                                }
                                let geprRauchmelder = new GeprRauchmelder(currSelectedRauchmelder.id,0,true,true,true,true,true,true,true,"","","now",currPruefung?.id)
                                let newGeprRauchmelderList = (currPruefung && currPruefung.rauchmelder)?currPruefung?.rauchmelder.slice():[]
                                newGeprRauchmelderList.push(geprRauchmelder)
                                let helperPruefung = new Pruefung(currPruefung!.id,currPruefung!.timestamp,currPruefung!.user,currPruefung!.objekt,newGeprRauchmelderList)
                                setCurrGeprRauchmelder(geprRauchmelder)
                                setCurrPruefung(helperPruefung)
                                setCurrSelectedRauchmelder(undefined)
                            }}/>
                        </div>
                        {
                            currPruefung?
                            currPruefung.rauchmelder.map(rauchmelder=>{
                                console.log(rauchmelder)
                                let wholeRauchmelder = alleRauchmelder.find(item=>item.id === rauchmelder.id)
                                return (
                                    <div className={(currGeprRauchmelder && rauchmelder.id === currGeprRauchmelder!.id)?styles.rauchmeldercard + " "+styles.activeRauchmelder:styles.rauchmeldercard} onClick={(event)=>{
                                        setCurrGeprRauchmelder(rauchmelder)
                                    }}>
                                        <div className={styles.rauchmeldercardtext}>
                                            <div className={styles.rauchmeldercardTitle}>
                                            {wholeRauchmelder?wholeRauchmelder.mieter + " "+ wholeRauchmelder.raum:rauchmelder.id }
                                            </div>
                                            {wholeRauchmelder?wholeRauchmelder.seriennr:""}
                                        </div>
                                    </div>)
                            })
                            :
                            <></>
                        }
                        </>
                    </div>
                </div>
                <div className={styles.pruefungsbox}>
                    <div className={styles.pruefungboxInside}>
                        <div className={styles.actualPruefung}>
                        {
                            currGeprRauchmelder?.id
                        }
                        </div>
                        <div className={styles.interactions}>
                            <Button color="error" variant="contained" disableElevation>Rauchmelder löschen</Button>
                            <Button color="success" variant="contained" disableElevation>Speichern</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPruefung