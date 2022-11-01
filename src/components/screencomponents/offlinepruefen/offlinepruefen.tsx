import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import data from '../../../services/datafunctions'
import { Objekt, toObjektConverter } from '../../../types/allgemein'
import { ClientStatus } from '../../../types/statusenum'
import Button from '../../button/button'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import styles from './offline.module.css'


function OfflinePruefen() {
    const [verfuegbareObjekte, setVerfuegbareObjekte] = useState<Objekt[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const [currObjektId,setCurrObjektId] = useState("")


    useEffect(()=>{
        data[ClientStatus.online].objekte.get(undefined,(data:any)=>{
            setVerfuegbareObjekte(data.map((objekt:any)=>toObjektConverter(objekt)))
        })
    },[])

    const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode)=>{
        setCurrObjektId(event.target.value!)
    }
    const handlePrepareOffline = ()=>{
        setIsLoading(true)
        data[ClientStatus.online].prepareOffline(verfuegbareObjekte.find((objekt)=>objekt.id===Number(currObjektId))!).then((value)=>{
            setIsLoading(false)
            // navigate
        })
    }
  return (
    <div className={styles.gesamtContainer}>
        <div className={styles.card}>
            {
                !isLoading?
                <>
                    <h1>
                        Zu Prüfendes Objekt:
                    </h1>
                    <FormControl fullWidth>
                        <InputLabel id="select-object-label">Objekt</InputLabel>
                        <Select
                            labelId="select-object-label"
                            id="select-object"
                            label="Objekt"
                            value={currObjektId}
                            onChange={handleChange}
                        >
                            {
                                verfuegbareObjekte.map((objekt:Objekt,index)=>{
                                    return <MenuItem key={index} value={objekt.id}>{objekt.name}</MenuItem> 
                                })
                            }
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={(event)=>handlePrepareOffline()} value="Bestätigen"/>
                </>
                :
                <Loadingspinner size='Big' />
            }
        </div>
    </div>
  )
}

export default OfflinePruefen