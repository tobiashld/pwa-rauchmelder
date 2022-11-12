import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent,  TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect,  useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import data from '../../../../services/datafunctions'
import { setPruefObjekt } from '../../../../store/slice'
import { RootState, useAppDispatch } from '../../../../store/store'
import {  GeprRauchmelder, Objekt, Pruefung, Rauchmelder,  toPruefungConverter, toRauchmelderConverter, User } from '../../../../types/allgemein'
import { ClientStatus } from '../../../../types/statusenum'
import AddButton from '../../../addbutton/addbutton'
import SaveButton from '../../../savebutton/savebutton'
import styles from './addpruefung.module.css'

function AddPruefung() {
    const [currGeprRauchmelder,setCurrGeprRauchmelder] = useState<GeprRauchmelder | undefined>()
    const pruefObjektString = useSelector((state:RootState)=>state.currPruefobjekt)
    const [currPruefObjekt,setCurrPruefObjekt] = useState<Objekt | undefined>(pruefObjektString?JSON.parse(pruefObjektString):undefined)
    const [currPruefung,setCurrPruefung] = useState<Pruefung | undefined>(undefined)
    const [currSelectedRauchmelder,setCurrSelectedRauchmelder] = useState<Rauchmelder | undefined>()
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

    useEffect(()=>{
        console.log(currGeprRauchmelder)
    },[currGeprRauchmelder])
    
    const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode)=>{
        setCurrSelectedRauchmelder(JSON.parse(event.target.value))
    }
    const handleSave = ()=>{
        if(currPruefung){
            if(id){
                data[ClientStatus.online].pruefungen.change(currPruefung,(data)=>{
                    console.log(data)
                })
            }else{
                data[ClientStatus.online].pruefungen.create(currPruefung,(data)=>{
                    console.log(data)
                })
            }
        }
    }
    

    return (
        <div className={styles.gesamtbox}>
            <div className={styles.outerbox}>
                <div className={styles.rauchmelderbox} >
                    <div className={styles.rauchmelderboxInside}>
                        
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
                                    alleRauchmelder.filter(rauchmelder=>currPruefung?.rauchmelder.find(index=>index.rauchmelderId===rauchmelder.id)?false:true).map(rauchmelder=>(
                                            <MenuItem
                                                key={rauchmelder.id}
                                                value={JSON.stringify(rauchmelder)}
                                            >
                                                {rauchmelder.seriennr+ " "+rauchmelder.mieter + " "+ rauchmelder.raum }
                                            </MenuItem>
                                    ))
                                    }
                                    
                                </Select>
                            </FormControl>
                            <AddButton routeParam='test' className={styles.addbutton} onClick={()=>{
                                if(!currSelectedRauchmelder)return
                                if(currPruefung?.rauchmelder.find(item=>item.rauchmelderId===currSelectedRauchmelder.id)){
                                    enqueueSnackbar("Dieser Rauchmelder ist bereits geprüft!",{variant:"warning"})
                                    return
                                }
                                let geprRauchmelder = new GeprRauchmelder(0,currSelectedRauchmelder.id,0,true,true,true,true,true,true,true,true,"","","now",currPruefung?.id)
                                let newGeprRauchmelderList = (currPruefung && currPruefung.rauchmelder)?currPruefung?.rauchmelder.slice():[]
                                newGeprRauchmelderList.push(geprRauchmelder)
                                let helperPruefung = new Pruefung(currPruefung!.id,currPruefung!.timestamp,currPruefung!.user,currPruefung!.objekt,newGeprRauchmelderList)
                                setCurrGeprRauchmelder(geprRauchmelder)
                                setCurrPruefung(helperPruefung)
                                setCurrSelectedRauchmelder(undefined)
                            }}/>
                        </div>
                        <div className={styles.rauchmelderliste}>
                        {
                            currPruefung?
                            currPruefung.rauchmelder.map(rauchmelder=>{
                                let wholeRauchmelder = alleRauchmelder.find(item=>item.id === rauchmelder.rauchmelderId)
                                return (
                                    <div className={(currGeprRauchmelder && rauchmelder.rauchmelderId === currGeprRauchmelder!.rauchmelderId)?styles.rauchmeldercard + " "+styles.activeRauchmelder:styles.rauchmeldercard} onClick={(event)=>{
                                        setCurrGeprRauchmelder(rauchmelder)
                                    }}>
                                        
                                            <div className={styles.rauchmeldercardTitle}>
                                            {wholeRauchmelder?wholeRauchmelder.mieter + " "+ wholeRauchmelder.raum:rauchmelder.rauchmelderId }
                                            </div>
                                            <div>    
                                            {wholeRauchmelder?wholeRauchmelder.seriennr:""}
                                            </div>
                                        
                                    </div>)
                            })
                            :
                            <></>
                        }
                        
                        </div>
                        <div className={styles.saveinteractions}>
                            <SaveButton onClick={handleSave} value="Prüfung abschließen" isShown={currPruefung?currPruefung?.rauchmelder.length > 0:false}/>
                        </div>
                    </div>
                </div>
                <div className={styles.pruefungsbox}>
                    <div className={styles.pruefungboxInside}>
                        <div className={styles.actualPruefung}>
                        {
                            currGeprRauchmelder?
                            <div className={styles.pruefungsinhalt}>
                                <div>
                                    {
                                        alleRauchmelder.filter(rauchmelder=>rauchmelder.id===currGeprRauchmelder.rauchmelderId).map(rauchmelder=>{
                                            return (
                                                <div className={styles.infotable}>
                                                        <div>
                                                            <strong>
                                                            Seriennr
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <strong>
                                                            Mieter
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <strong>
                                                            Objekt
                                                            </strong>
                                                        </div>
                                                    
                                                        <div>
                                                            {rauchmelder.seriennr}
                                                        </div>
                                                        <div>
                                                            {rauchmelder.mieter}
                                                        </div>
                                                        <div>
                                                            {rauchmelder.objekt.name}
                                                        </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <TextField 
                                        fullWidth
                                        className={styles.anmerkung}
                                        placeholder="Allgemeine Anmerkungen"
                                        onChange={(event)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.anmerkungen = event.target.value
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }}
                                        value={currGeprRauchmelder.anmerkungen}
                                    />
                                </div>

                                <div className={styles.pruefungskriterien}>
                                    <FormGroup>
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.selberRaum = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder!.selberRaum?true:false}/>} label="Nutzung des Raums gleich (z.B. Wohnzimmer wurde nicht zum Schlafzimmer)?" />
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.baulichUnveraendert = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder &&currGeprRauchmelder.baulichUnveraendert?currGeprRauchmelder.baulichUnveraendert:false}/>} label="Raum ist baulich unverändert?" />
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.hindernisseUmgebung = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder.hindernisseUmgebung?true:false} />} label="Keine Hindernisse in der umgebung von 0,5m? Leuchte näher als 50 cm?" />
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.relevanteBeschaedigung = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder.relevanteBeschaedigung?true:false} />} label="Keine funktionsrelevante Beschädigung?" />
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.oeffnungenFrei = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder.oeffnungenFrei?true:false} />} label="Raucheindringöffnungen frei?" />
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.warnmelderGereinigt = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder.warnmelderGereinigt?true:false} />} label="Rauchwarnmelder gereinigt?" />
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.pruefungErfolgreich = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder.pruefungErfolgreich?true:false} />} label="Funktionsprüfung erfolgreich?" />
                                        <FormControlLabel onChange={(event,checked)=>{
                                            let helpPruefung = structuredClone(currGeprRauchmelder)
                                            helpPruefung!.batterieGut = checked
                                            setCurrGeprRauchmelder(helpPruefung)
                                        }} control={<Checkbox checked={currGeprRauchmelder.batterieGut?true:false} />} label="Batterie in Ordnung?" />
                                    </FormGroup>
                                </div>
                                <div className={styles.pruefungstext}>
                                    <div className={styles.grundselect}>

                                        <FormControl sx={{ width:"100%",backgroundColor:"white" }} >
                                            <InputLabel id="grund">Grund</InputLabel>
                                            <Select
                                                labelId="grund"
                                                id="single-select"
                                                value={currGeprRauchmelder.grund.toString()}
                                                label="Grund"
                                                onChange={(event)=>{
                                                    let helpPruefung = structuredClone(currGeprRauchmelder)
                                                    helpPruefung!.grund = Number.parseInt(event.target.value)
                                                    setCurrGeprRauchmelder(helpPruefung)
                                                }}
                                            >
                                                
                                                        <MenuItem value="0">Erstinbetriebnahme</MenuItem>
                                                        <MenuItem value="1">Inspektion / Wartung</MenuItem>
                                                        <MenuItem value="2">Erstinbetriebnahme + Ausgetauscht</MenuItem>
                                                
                                                
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <TextField
                                            placeholder='Prüfungsrelevante Anmerkungen' 
                                            value={currGeprRauchmelder.anmerkungenZwei}
                                            fullWidth
                                            onChange={(event)=>{
                                                let helpPruefung = structuredClone(currGeprRauchmelder)
                                                helpPruefung!.anmerkungenZwei = event.target.value
                                                setCurrGeprRauchmelder(helpPruefung)
                                            }}
                                            className={styles.anmerkung}
                                        />
                                    </div>

                                </div>
                            </div>
                            
                            :
                            <></>
                        }

                        
                        </div>
                        {
                            currGeprRauchmelder?
                            <div className={styles.interactions}>
                                <Button color="error" variant="contained" onClick={(event)=>{
                                    let newGeprRauchmelderList = currPruefung?.rauchmelder.slice()
                                    if(newGeprRauchmelderList){
                                        let filteredList = newGeprRauchmelderList.filter(item=>item.rauchmelderId!==currGeprRauchmelder.rauchmelderId)
                                        let helperPruefung = new Pruefung(currPruefung!.id,currPruefung!.timestamp,currPruefung!.user,currPruefung!.objekt,filteredList)
                                        setCurrGeprRauchmelder(undefined)
                                        setCurrPruefung(helperPruefung)
                                        setCurrSelectedRauchmelder(undefined)
                                    }
                                }} disableElevation>Rauchmelder löschen</Button>
                                <Button color="success" variant="contained" disableElevation onClick={(event)=>{
                                    let newPruefung = structuredClone(currPruefung)
                                    let newGeprRauchmelderList = newPruefung?.rauchmelder
                                    if(newGeprRauchmelderList){
                                        let filteredList = newGeprRauchmelderList.map(item=>{
                                            if(item.rauchmelderId===currGeprRauchmelder.rauchmelderId){
                                                return currGeprRauchmelder
                                            }else{
                                                return item
                                            }
                                        })
                                        let helperPruefung = newPruefung
                                        helperPruefung!.rauchmelder = filteredList
                                        setCurrPruefung(helperPruefung)
                                        setCurrSelectedRauchmelder(undefined)
                                    }
                                }}>Rauchmelder Speichern</Button>
                            </div>
                            :
                            <></>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPruefung