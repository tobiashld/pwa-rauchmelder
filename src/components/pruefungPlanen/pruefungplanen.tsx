import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsGeo } from 'react-icons/bs';
import data from '../../services/datafunctions';
import { Objekt, toObjektConverter } from '../../types/allgemein';
import { ClientStatus } from '../../types/statusenum';
import Button from '../button/button';
import styles from './pruefungen.module.css'

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

function PruefungenPlanen() {
    const [alleObjekte,setAlleObjekte] = useState<Objekt[]>([])
    const [pruefObjekte,setPruefObjekte] = useState<number[]>([])
    useEffect(()=>{
        data[ClientStatus.online].objekte.get(undefined,(data:any)=>{
            setAlleObjekte(data.map((objekt:any)=>toObjektConverter(objekt)))
        })
    },[])

    const handlePruefungPlanen  = ()=>{
        const ausgewaehlteObjekte = pruefObjekte.map((id)=>alleObjekte.find(obj=>obj.id===id))
        if(ausgewaehlteObjekte){

        }
    }

    const handleChange = (event: SelectChangeEvent<typeof pruefObjekte>) => {
        const {
          target: { value },
        } = event;
        setPruefObjekte(
          // On autofill we get a stringified value.
          typeof value === 'string'?value.split(",").map(item=>Number(item)):value
        );
      };

  return (
    <div className={styles.gesamt}>
        <div>
            <h3>
            Prüfung planen
            </h3>
        </div>
        <FormControl sx={{ m: 1,width:"90%" }} >
        <InputLabel id="pruefplanung-label">Objekte</InputLabel>
        <Select
          labelId="pruefplanung-label"
          id="multiple-chip"
          multiple
          value={pruefObjekte}
          label="Objekte"
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value,index) => {
                let obj = alleObjekte.find((valueZwei)=>valueZwei.id===value)
                if(obj){
                    return (<Chip key={obj.id} label={obj.name} />)
                }else{
                    return (<Chip key={index} label={value} />)
                }
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {
            alleObjekte.map(objekt=>(
                    <MenuItem
                        key={objekt.id}
                        value={objekt.id}
                    >
                        {objekt.name}
                    </MenuItem>
            ))
          }
            
        </Select>
      </FormControl>
      <Button onClick={(event)=>handlePruefungPlanen()} value={"Route bestimmen"} icon={<BsGeo />}/>
    </div>
  )
}

export default PruefungenPlanen