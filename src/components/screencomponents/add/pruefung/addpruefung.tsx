import { Autocomplete, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, Tab,  Tabs,  TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, {  useRef,  useState } from 'react'
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';import { useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import dataFunctions from '../../../../services/datafunctions'
import { RootState } from '../../../../store/store'
import {  GeprRauchmelder,  Pruefung, toPruefungConverter} from '../../../../types/allgemein'
import { ClientStatus } from '../../../../types/statusenum'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import PersonIcon from '@mui/icons-material/Person';
import styles from './addpruefung.module.css'
import { RauchmelderBeziehung } from '../../../../types/rauchmelder';
import { useQuery } from 'react-query';
import Loadingspinner from '../../../loadingspinner/loadingspinner';
import { DatePicker } from '@mui/x-date-pickers';
import Scrollbars from 'react-custom-scrollbars-2';

function AddPruefung() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clientStatus = useSelector((state:RootState)=>state.isOffline)
    // const [autofillvalue,setAutofillvalue] = useState("")
    const [changedMieter,setChangedMieter] = useState<{[key:number]:string}>({})
    const [currGeprRauchmelder,setCurrGeprRauchmelder] = useState<GeprRauchmelder | undefined>()
    const [page,setPage] = useState(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    const { id } = useParams()
    const currPruefObjektParam = Number.parseInt(id?id:"0")===-1&&searchParams.get("pruefObjekt")?searchParams.get("pruefObjekt"):undefined
    const currPruefObjektQuery = useQuery(["objekt",currPruefObjektParam],()=>dataFunctions[1].objekte.get({"id":currPruefObjektParam}),{enabled:currPruefObjektParam?true:false})
    const [currPruefung,setCurrPruefung] = useState<Pruefung| undefined>(new Pruefung(-1,"now",[],currPruefObjektQuery.data?.data?.at(0),undefined))
    const [currSelectedRauchmelder,setCurrSelectedRauchmelder] = useState<RauchmelderBeziehung | undefined>()
    const rauchmelderQuery = useQuery(["objekt",currPruefObjektParam?currPruefObjektParam:currPruefung?.objekt?.id?currPruefung?.objekt?.id:-1,"rauchmelder"],dataFunctions[ClientStatus.online].rauchmelder.getForObject)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pruefungQuery = useQuery(["pruefung",id],()=>dataFunctions[1].pruefungen.get({"id":id}),{enabled:id !== "-1"?true:false,onSuccess:(data)=>{
            setCurrPruefung(data?.data?.at(0))
    }})
    const [showNewRauchmelder,setShowNewRauchmelder] = useState(false)
    const newSeriennrRef = useRef(null)
    const [newProdDatum,setNewProdDatum] = useState("")
    const [currMieterName,setCurrMieterName] = useState("")
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    

    React.useEffect(()=>{
        let currRauchmelderBz = rauchmelderQuery.data?.data.filter(rauchmelder=>rauchmelder.aktuelleHistorienID===currGeprRauchmelder?.rauchmelderId)
        if(currRauchmelderBz && currRauchmelderBz.length === 1){
            let wohnungsId = currRauchmelderBz.at(0)?.wohnungsID
            setCurrMieterName(wohnungsId && changedMieter[wohnungsId]?changedMieter[wohnungsId]:"")
        }else{
            setCurrMieterName("")
        }
        
    },[currGeprRauchmelder])
    

    // if(pruefungQuery.isSuccess){
    //     setCurrPruefung(toPruefungConverter(pruefungQuery.data?.data?[0]?pruefungQuery.data.data[0]:new Pruefung(-1,"",)))
    // }

    const handleChange = (event:any, value:any, reason:any, details:any)=>{
        setCurrSelectedRauchmelder(value)
    }
    const handleSave = ()=>{
        if(currPruefung){
            if(id){
                dataFunctions[ClientStatus.online].pruefungen.change(currPruefung,(data)=>{
                    if(data && data.status && data.status===200){
                        enqueueSnackbar(data.data,{variant:"success"})
                        navigate("/pruefungen")
                    }else if(data){
                        enqueueSnackbar("Hinzufügen der Prüfung fehlgeschlagen. Probiere es erneut",{variant:"error"})
                    }
                })
            }else{
                dataFunctions[ClientStatus.online].pruefungen.create(currPruefung,(data)=>{
                    if(data && data.status && data.status===200){
                        enqueueSnackbar(data.data,{variant:"success"})
                        navigate("/pruefungen")
                    }else if(data){
                        enqueueSnackbar("Hinzufügen der Prüfung fehlgeschlagen. Probiere es erneut",{variant:"error"})
                    }
                })
            }
        }
    }
    if(rauchmelderQuery.isLoading || !rauchmelderQuery.data || !rauchmelderQuery.data.data)return <Loadingspinner size='Big' />
    if(rauchmelderQuery.isError){
        enqueueSnackbar("Error in addpruefung component",{variant:"error"})
        return <div>Error</div>
    }

    return (
        <div className={styles.fullcell}>
            <div className={styles.gesamtbox}>
                <div className={styles.outerbox}>
                    <div className={styles.rauchmelderbox} >
                        <div className={styles.rauchmelderboxInside}>
                        
                            <div className={styles.gesamtuebersicht}>
                            <div className={styles.rauchmeldercard + " " + styles.addcard}>
                            <Autocomplete
                                id="pruefung-rauchmelder-select"
                                value={currSelectedRauchmelder}
                                onChange={handleChange}
                                options={rauchmelderQuery!.data!.data.filter(rauchmelder=>currPruefung?.rauchmelder.find(index=>index.rauchmelderId===rauchmelder.aktuelleHistorienID)?false:true)}
                                groupBy={(option) => `${option.wohnung?.nachname}`}
                                getOptionLabel={(option) => option.aktuellerRauchmelder?.seriennr + " "+option.aktuellerRauchmelder?.raum}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Rauchmelder" />}
                                />
                                {/* <FormControl fullWidth>
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
                                            if(value=== "")return ""
                                            let rauchmelder : RauchmelderBeziehung= JSON.parse(value)
                                            return rauchmelder.aktuellerRauchmelder!.seriennr + " " + rauchmelder.aktuellerRauchmelder!.raum
                                        }}
                                    >
                                        {
                                        rauchmelderQuery!.data!.data.filter(rauchmelder=>currPruefung?.rauchmelder.find(index=>index.rauchmelderId===rauchmelder.aktuelleHistorienID)?false:true).map(rauchmelder=>{
                                            
                                            return (
                                                <MenuItem
                                                    key={rauchmelder.aktuelleHistorienID}
                                                    value={JSON.stringify(rauchmelder)}
                                                >
                                                    {rauchmelder.aktuellerRauchmelder!.seriennr+ " "+ rauchmelder.aktuellerRauchmelder!.raum }
                                                </MenuItem>
                                        )})
                                        }
            
                                    </Select>
                                </FormControl> */}
                                <IconButton
                                    className={styles.addbutton}
                                    size='medium'
                                    onClick={()=>{
                                        if(!currSelectedRauchmelder)return
                                        if(currPruefung?.rauchmelder.find((item:GeprRauchmelder)=>item.rauchmelderId===currSelectedRauchmelder.aktuelleHistorienID)){
                                            enqueueSnackbar("Dieser Rauchmelder ist bereits geprüft!",{variant:"warning"})
                                            return
                                        }
                                        let geprRauchmelder = new GeprRauchmelder(0,currSelectedRauchmelder.id,0,true,true,true,true,true,true,true,true,"","")
                                        let newGeprRauchmelderList = (currPruefung && currPruefung.rauchmelder)?currPruefung?.rauchmelder.slice():[]
                                        newGeprRauchmelderList.push(geprRauchmelder)
                                        setCurrGeprRauchmelder(geprRauchmelder)
                                        setCurrPruefung({
                                            ...currPruefung,
                                            id:currPruefung?.id?currPruefung.id:-1,
                                            timestamp:currPruefung?.timestamp?currPruefung.timestamp:"",
                                            rauchmelder:currPruefung?.rauchmelder?[...currPruefung?.rauchmelder,geprRauchmelder]:[geprRauchmelder]
                                        })
                                        setCurrSelectedRauchmelder(undefined)
                                    }}
                                >
                                    <PlaylistAddSharpIcon color='inherit' fontSize='medium' />
                                </IconButton>
                                {/* <AddButton routeParam='test' className={styles.addbutton} onClick={()=>{
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
                                }}/> */}
                            </div>
                            
                            <Divider variant="middle" className={styles.divider}/>
                            
                            <Scrollbars className={styles.rauchmelderliste}>
                            {
                                currPruefung?
                                currPruefung?.rauchmelder.map(rauchmelder=>{
                                    let rauchmelderBz = rauchmelderQuery.data!.data!.find(item=>item.aktuelleHistorienID === rauchmelder.rauchmelderId)
                                    return (
                                        <div className={(currGeprRauchmelder && rauchmelder.rauchmelderId === currGeprRauchmelder!.rauchmelderId)?styles.rauchmeldercard + " "+styles.activeRauchmelder:styles.rauchmeldercard} onClick={(event)=>{
                                            setCurrGeprRauchmelder(rauchmelder)
                                        }}>
                                                <div className={styles.rauchmeldercardTitle}>
                                                {rauchmelderBz?rauchmelderBz.aktuellerRauchmelder!.raum:rauchmelder.rauchmelderId }
                                                </div>
                                                <div>
                                                {rauchmelderBz?rauchmelderBz.aktuellerRauchmelder!.seriennr:"abgelöst"}
                                                </div>
            
                                        </div>)
                                }):
                                <Loadingspinner size="Big" />
                            }
                            </Scrollbars>
                           </div>
                             <div hidden={page!==1}>
                            Test
                            </div>
                            {currPruefung?currPruefung?.rauchmelder.length > 0 && Number.parseInt(id?id:"0") === -1?
                                <div className={styles.saveinteractions}>
                                    <Button fullWidth color='success' variant='contained' onClick={handleSave} disabled={currPruefung.rauchmelder.length<=0}>Prüfung abschließen</Button>
                                </div>
                                :<></>:<></>}
                        </div>

                        
                        
                        
                    </div>
                    <div className={styles.pruefungsbox}>
                        <div className={styles.pruefungboxInside}>
                            <div className={styles.actualPruefung}>
                            {
                                currGeprRauchmelder?
                                <Scrollbars >
                                    <div className={styles.pruefungsinhalt}>
                                    <div >
                                        {
                                            rauchmelderQuery.data.data.filter(rauchmelder=>rauchmelder.aktuelleHistorienID===currGeprRauchmelder.rauchmelderId).map(rauchmelder=>{
                                                let isTreppenhaus = rauchmelder.wohnung?.id === 5
                                                let isChangedMieter = rauchmelder.wohnung?.id && !isTreppenhaus && changedMieter[rauchmelder.wohnung.id]?changedMieter[rauchmelder.wohnung.id]:undefined
                                                return (
                                                    <div className={styles.infotable}>
                                                            <div>
                                                                <strong>
                                                                Seriennr
                                                                </strong>
                                                            </div>
                                                            <div>
                                                                <strong>
                                                                    {!isTreppenhaus?"Mieter Nachname":""}
                                                                </strong>
                                                            </div>
                                                            
            
                                                            <div>
                                                                {rauchmelder.aktuellerRauchmelder!.seriennr}
                                                            </div>
                                                            <div>
                                                                {!isTreppenhaus?<TextField value={currMieterName} size='small' id="add-pruefung-mieter" placeholder={isChangedMieter?isChangedMieter:rauchmelder.wohnung?.nachname}
                                                                onChange={(event)=>{
                                                                    setCurrMieterName(event.target.value?event.target.value:"")
                                                                    if(event.currentTarget.value && event.currentTarget.value !== ""){
                                                                        
                                                                        setChangedMieter(prev=>{
                                                                            let copy = {...prev}
                                                                            prev[rauchmelder.wohnungsID] = event.target.value
                                                                            return copy
                                                                        })
                                                                    }else if(event.target.value === ""){
                                                                        setChangedMieter(prev=>{
                                                                            let copy = {...prev}
                                                                            delete copy[rauchmelder.wohnungsID]
                                                                            return copy
                                                                        })
                                                                    }
                                                                }}
                                                                ></TextField>:rauchmelder.wohnung!.nachname}
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
                                            placeholder="Allgemeine Anmerkungen (Tausch etc.)"
                                            id="allgemeine-anmerkungen"
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
                                                        if(helpPruefung!.grund === 2 ){
                                                            setShowNewRauchmelder(true)
                                                        }else{
                                                            setShowNewRauchmelder(false)
                                                        }
                                                    }}
                                                >
            
                                                            <MenuItem value="0">Erstinbetriebnahme</MenuItem>
                                                            <MenuItem value="1">Inspektion / Wartung</MenuItem>
                                                            <MenuItem value="2">Ausgetauscht + Erstinbetriebnahme</MenuItem>
            
            
                                                </Select>
                                            </FormControl>
                                        </div>
                                        {
                                            showNewRauchmelder && Number.parseInt(id?id:"0") === -1?
                                            <div className={styles.newRauchmelderDiv}>
                                                <TextField
                                                    placeholder="Neue Seriennr"
                                                    className={styles.newSeriennr+" "+styles.input}
                                                    inputRef={newSeriennrRef}
                                                />
                                                <DatePicker 
                                                    label="Produktionsdatum"
                                                    value={newProdDatum}
                                                    inputFormat="DD/MM/yyyy"
                                                    onChange={(newValue)=>{
                                                        setNewProdDatum(newValue?newValue:"")
                                                    }}
                                                    renderInput={(params)=><TextField {...params} />}
                                                    className={styles.newProddatum+" "+styles.input}
                                                />
                                            </div>:
                                            <></>
                                        }
            
                                        <div>
                                            <TextField
                                                placeholder='Prüfungsrelevante Anmerkungen (Grund fürs Nicht-Bestehen etc.)'
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
                                </Scrollbars>
                                :
                                <></>
                            }
            
                            </div>
                            {
                                // currGeprRauchmelder?
                                // <div className={styles.interactions}>
                                //     <Button color="error" variant="contained" onClick={(event)=>{
                                //         let newGeprRauchmelderList = currPruefung?.rauchmelder.slice()
                                //         if(newGeprRauchmelderList){
                                //             let filteredList = newGeprRauchmelderList.filter(item=>item.rauchmelderId!==currGeprRauchmelder.rauchmelderId)
                                //             let helperPruefung = new Pruefung(currPruefung!.id,currPruefung!.timestamp,filteredList,currPruefung!.objekt,currPruefung!.user)
                                //             setCurrGeprRauchmelder(undefined)
                                //             setCurrPruefung(helperPruefung)
                                //             setCurrSelectedRauchmelder(undefined)
                                //         }
                                //     }} disableElevation>Rauchmelder löschen</Button>
                                //     <Button color="success" variant="contained" disableElevation onClick={(event)=>{
                                //         let newPruefung = structuredClone(currPruefung)
                                //         let newGeprRauchmelderList = newPruefung?.rauchmelder
                                //         if(newGeprRauchmelderList){
                                //             let filteredList = newGeprRauchmelderList.map(item=>{
                                //                 if(item.rauchmelderId===currGeprRauchmelder.rauchmelderId){
                                //                     return currGeprRauchmelder
                                //                 }else{
                                //                     return item
                                //                 }
                                //             })
                                //             let helperPruefung = newPruefung
                                //             helperPruefung!.rauchmelder = filteredList
                                //             setCurrPruefung(helperPruefung)
                                //             setCurrSelectedRauchmelder(undefined)
                                //         }
                                //     }}>Rauchmelder Speichern</Button>
                                // </div>
                                // :
                                // <></>
                            }
            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPruefung